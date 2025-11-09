import { defineConfig } from 'vitepress'
import { nav } from './configs'

const vitepressSidebarOptions = {
  /* Options... */
};
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NeoBot V3 Docs",
  description: "Documentation for NeoBot V3",
  lastUpdated: true,
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    sidebar: [
      { text: '简介', link: '/docs/description' },
      {
        text: '快速上手',
        collapsed: false,
        items: [
          { text: '下载', link: '/docs/guide/getting-started' },
          { text: '开始使用', link: '/docs/guide/usage' },
        ]
      }
    ],
    nav,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      message: 'Released under the LGPL-3 License.',
      copyright: 'Copyright © 2025 NeoVoxel Team'
    },
    darkModeSwitchLabel: "切换主题",
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    outlineTitle: "当前页大纲",
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "菜单",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    }
  }
)
