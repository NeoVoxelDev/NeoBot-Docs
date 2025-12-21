<!-- .vitepress/theme/components/VPTeamMembers.vue -->
<script setup lang="ts">
interface Member {
  avatar: string
  name: string
  title: string
  links: Array<{
    icon: string
    link: string
  }>
}

interface Props {
  members?: Member[]
}

const props = withDefaults(defineProps<Props>(), {
  members: () => []
})

const defaultMembers = [
  {
    avatar: 'https://www.github.com/Aurelian2842.png',
    name: 'Aurelian2842',
    title: '开发者',
    links: [
      { icon: 'github', link: 'https://github.com/Aurelian2842' },
      { icon : 'QQ', link: 'http://wpa.qq.com/msgrd?v=3&uin=2706858398&site=qq&menu=yes' }
    ]
  },
  {
    avatar: 'https://www.github.com/RegadPoleCN.png',
    name: 'RegadPoleCN',
    title: '开发者',
    links: [
      { icon: 'github', link: 'https://github.com/RegadPoleCN' },
      { icon : 'QQ', link: 'http://wpa.qq.com/msgrd?v=3&uin=1651233735&site=qq&menu=yes' }
    ]
  },
  {
    avatar: 'https://www.github.com/7ooki.png',
    name: 'Cotté',
    title: '开发者',
    links: [
      { icon: 'github', link: 'https://github.com/7ooki' },
      { icon : 'QQ', link: 'http://wpa.qq.com/msgrd?v=3&uin=254164579&site=qq&menu=yes' }

    ]
  },
  {
    avatar: 'https://www.github.com/mc506lw.png',
    name: 'mc506lw',
    title: '开发者',
    links: [
      { icon: 'github', link: 'https://github.com/mc506lw' },
      { icon : 'QQ', link: 'http://wpa.qq.com/msgrd?v=3&uin=3462689887&site=qq&menu=yes' },
      { icon : 'Bilibili', link: 'https://space.bilibili.com/696652305' }
    ]
  }
]
const getIconClass = (icon: string) => {
  const iconMap: Record<string, string> = {
    github: 'fab fa-github',
    twitter: 'fab fa-twitter',
    QQ: 'fab fa-qq',
    Bilibili: 'fab fa-bilibili',
    // 可以添加更多图标映射
  }
  return iconMap[icon] || 'fas fa-link'
}

const teamMembers = props.members.length > 0 ? props.members : defaultMembers
</script>

<template>
  <div class="vp-team-members">
    <div class="container">
      <div class="members">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="member-card"
        >
          <div class="member-avatar">
            <img :src="member.avatar" :alt="member.name" />
          </div>
          <div class="member-info">
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-title">{{ member.title }}</p>
            <div class="member-links">
              <a
                v-for="(link, linkIndex) in member.links"
                :key="linkIndex"
                :href="link.link"
                target="_blank"
                rel="noopener noreferrer"
                class="member-link"
                :title="link.icon"
              >
                <i :class="getIconClass(link.icon)"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vp-team-members {
  padding: 2rem 0;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

.members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.member-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.member-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.member-avatar {
  flex-shrink: 0;
}

.member-avatar img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.member-info {
  flex: 1;
}

.member-name {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.member-title {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.member-links {
  display: flex;
  gap: 0.75rem;
}

.member-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
  text-decoration: none;
}

.member-link:hover {
  background: var(--vp-c-brand-1);
  color: white;
  transform: translateY(-2px);
}

.link-icon {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>