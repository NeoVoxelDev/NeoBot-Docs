<!-- .vitepress/theme/components/VPCommunityScriptsCN.vue -->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Script {
  schema_version: number
  id: string
  name: string
  author: string
  version: string
  description: string
  type: string
  download: string
}

interface RepoData {
  schema_version: number
  name: string
  author: string
  description: string
  website: string
  plugins: Script[]
}

const scripts = ref<Script[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const searchQuery = ref('')

const fetchScripts = async () => {
  try {
    isLoading.value = true
    error.value = null

    const response = await fetch('https://hub.gitmirror.com/https://github.com/NeoVoxelDev/NeoBotScriptsRepo/raw/refs/heads/main/repo.json')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: RepoData = await response.json()
    scripts.value = data.plugins || []
  } catch (err) {
    console.error('获取脚本失败:', err)
    error.value = '加载脚本失败，请稍后重试。'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchScripts()
})

const getTypeColor = (type: string) => {
  const typeMap: Record<string, string> = {
    collection: 'var(--vp-c-green-1)',
    plugin: 'var(--vp-c-blue-1)',
    script: 'var(--vp-c-purple-1)'
  }
  return typeMap[type] || 'var(--vp-c-gray-1)'
}

const getTypeLabel = (type: string) => {
  const typeMap: Record<string, string> = {
    collection: '聚合',
    plugin: '插件',
    script: '脚本'
  }
  return typeMap[type] || type
}

const downloadScript = (downloadUrl: string) => {
  window.open(downloadUrl, '_blank')
}

const filteredScripts = computed(() => {
  if (!searchQuery.value.trim()) {
    return scripts.value
  }

  const query = searchQuery.value.toLowerCase()
  return scripts.value.filter(script =>
    script.name.toLowerCase().includes(query) ||
    script.id.toLowerCase().includes(query) ||
    script.author.toLowerCase().includes(query) ||
    script.description.toLowerCase().includes(query) ||
    script.type.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div class="vp-scripts-container">
    <div class="container">
      <div class="search-container">
        <input v-model="searchQuery" type="text" placeholder="搜索脚本名称、ID、作者、描述或类型..." class="search-input" />
      </div>

      <div v-if="isLoading" class="loading">
        <div class="loading-spinner"></div>
        <p>加载脚本中...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="fetchScripts" class="retry-button">重试</button>
      </div>

      <div v-else-if="filteredScripts.length === 0" class="empty">
        <p>{{ searchQuery ? '未找到匹配的脚本' : '暂无脚本' }}</p>
      </div>

      <div v-else class="scripts">
        <div v-for="(script, index) in filteredScripts" :key="index" class="script-card">
          <div class="script-header">
            <h3 class="script-name">{{ script.name }}</h3>
            <span class="script-type" :style="{ backgroundColor: getTypeColor(script.type) }">
              {{ getTypeLabel(script.type) }}
            </span>
          </div>

          <div class="script-info">
            <div class="script-id">
              <span class="info-label">ID:</span>
              <span class="info-value">{{ script.id }}</span>
            </div>

            <div class="script-author">
              <span class="info-label">作者:</span>
              <span class="info-value">{{ script.author }}</span>
            </div>

            <div class="script-version">
              <span class="info-label">版本:</span>
              <span class="info-value">{{ script.version }}</span>
            </div>
          </div>

          <div class="script-description">
            <p>{{ script.description }}</p>
          </div>

          <div class="script-actions">
            <button @click="downloadScript(script.download)" class="download-button">
              下载
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vp-scripts-container {
  padding: 2rem 0;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

.search-container {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
}

.loading,
.error,
.empty {
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

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background-color: var(--vp-c-brand-2);
}

.scripts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .scripts {
    grid-template-columns: 1fr;
  }
}

.script-card {
  padding: 1.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.script-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.script-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.script-name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.script-type {
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  transform: translateY(-2px);
}

.script-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.script-id,
.script-author,
.script-version {
  display: flex;
  gap: 0.5rem;
}

.info-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 40px;
}

.info-value {
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.script-description {
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.script-description p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  font-size: 0.9rem;
}

.script-actions {
  display: flex;
  justify-content: flex-end;
}

.download-button {
  padding: 0.5rem 1.25rem;
  background-color: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.download-button:hover {
  background-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
}
</style>