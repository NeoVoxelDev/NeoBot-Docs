<template>
  <div>
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>加载下载链接中...</p>
    </div>

    <div v-else-if="list.length === 0" class="error-container">
      <p>加载失败，请刷新页面重试</p>
      <ul v-if="errors.length > 0">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>渠道</th>
          <th>版本</th>
          <th>发布</th>
          <th>下载</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td><a target="_blank" :href="item.source.link">{{ item.source.name }}</a></td>
          <td>{{ item.version }}</td>
          <td><a target="_blank" :href="item.release">点击查看</a></td>
          <td>
            <span v-for="download in item.download">
              <a target="_blank" :href="download.link">{{ download.name }}</a>
              <br />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <ul></ul>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref } from 'vue'

interface DownloadItem {
  source: {
    name: string,
    link: string
  }
  version: string
  release: string
  download: [
    {
      name: string,
      link: string
    }
  ]
}

const list: Ref<DownloadItem[]> = ref([])
const isLoading = ref(true)
const errors: Ref<string[]> = ref([])

const githubLatestRelease = async () => {
  const res = await fetch('https://api.github.com/repos/NeoVoxelDev/NeoBot/releases/latest')
  const data = await res.json()
  return {
    source: {
      name: 'Github Releases',
      link: 'https://github.com/NeoVoxelDev/NeoBot/releases'
    },
    version: data.tag_name,
    release: data.html_url,
    download: data.assets.map((item: any) => {
      return {
        name: item.name,
        link: item.browser_download_url
      }
    })
  }
}

const githubRunartifacts = async (run: any) => {
  const res = await fetch(`https://api.github.com/repos/NeoVoxelDev/NeoBot/actions/runs/${run.id}/artifacts`)
  const data = await res.json()
  return data.artifacts.map((item: { name: any; id: any; }) => {
    return {
      name: `${item.name}.zip`,
      link: `https://github.com/NeoVoxelDev/NeoBot/actions/runs/${run.id}/artifacts/${item.id}`
    }
  })
}

const githubLatestBuild = async () => {
  const res = await fetch('https://api.github.com/repos/NeoVoxelDev/NeoBot/actions/workflows/gradle.yml/runs?per_page=1&status=success')
  const data = await res.json()
  const run = data.workflow_runs[0]
  return {
    source: {
      name: 'Github Actions',
      link: 'https://github.com/NeoVoxelDev/NeoBot/actions/workflows/gradle.yml'
    },
    version: `Gradle-${run.head_sha.substring(0, 7)}`,
    release: run.html_url,
    download: await githubRunartifacts(run)
  }
}

const giteeLatestRelease = async () => {
  const res = await fetch('https://gitee.com/api/v5/repos/NeoVoxelDev/NeoBot/releases/latest')
  const data = await res.json()
  return {
    source: {
      name: 'Gitee 发行版',
      link: 'https://gitee.com/NeoVoxelDev/NeoBot/releases'
    },
    version: data.tag_name,
    release: `https://gitee.com/NeoVoxelDev/NeoBot/releases/tag/${data.tag_name}`,
    download: data.assets.filter((item: any) => {
      return item.name.endsWith('.jar')
    }).map((item: any) => {
      return {
        name: item.name,
        link: item.browser_download_url
      }
    })
  }
}

const spigotmcLatestUpdate = async () => {
  const res = await fetch('https://api.spiget.org/v2/resources/83027/updates/latest')
  const data = await res.json()
  return `https://www.spigotmc.org/resources/83027/update?update=${data.id}`
}

/* const spigotmcLatestVersion = async () => {
  const res = await fetch('https://api.spiget.org/v2/resources/8301127/versions/latest')
  const data = await res.json()
  return {
    source: {
      name: 'SpigotMC',
      link: 'https://www.spigotmc.org/resources/8311027/'
    },
    version: `${data.name}`,
    release: await spigotmcLatestUpdate(),
    download: [
      {
        name: 'ZMusic Latest',
        link: `https://www.spigotmc.org/resources/8301127/download?version=${data.id}`
      }
    ] as any
  }
} */

onMounted(async () => {
  try {
    const data = await githubLatestRelease()
    list.value.push(data)
  } catch (e) {
    console.error(e)
    errors.value.push('加载 GitHub 发布版本失败')
  }

  try {
    const data = await githubLatestBuild()
    list.value.push(data)
  } catch (e) {
    console.error(e)
    errors.value.push('加载 GitHub 构建版本失败')
  }

  try {
    const data = await giteeLatestRelease()
    list.value.push(data)
  } catch (e) {
    console.error(e)
    errors.value.push('加载 Gitee 发布版本失败')
  }

  /*try {
    const data = await spigotmcLatestVersion()
    list.value.push(data)
  } catch (e) {
    console.error(e)
  }*/

  isLoading.value = false
})
</script>

<style scoped>
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  color: var(--vp-c-text-2);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--vp-c-bg-soft);
  border-top: 3px solid var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.error-container {
  color: var(--vp-c-red-1);
}
</style>