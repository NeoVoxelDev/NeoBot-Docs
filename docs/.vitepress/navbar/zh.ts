import { DefaultTheme } from 'vitepress'

// 中文导航
export const zhNav: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/' },
  { text: '快速开始', link: '/quick-started/', activeMatch: '/quick-started/' },
  { text: '参考', link: '/reference/', activeMatch: '/reference/' },
]