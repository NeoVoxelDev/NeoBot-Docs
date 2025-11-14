import { zhNav } from '../navbar'
import { zhSidebar } from '../sidebar'
import dayjs from 'dayjs'
import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    lastUpdatedText: '上次更新',
    returnToTopLabel: '返回顶部',
    nav: zhNav,
    sidebar: zhSidebar,
    docFooter: {
      prev: '上一篇', 
      next: '下一篇',
    },
    darkModeSwitchLabel: '切换主题',
    sidebarMenuLabel: "菜单",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    footer: {
      message: '根据 <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">LGPL-3 许可证</a> 发布。',
      copyright: `版权所有 © ${dayjs().format("YYYY")} <a href="https://github.com/NeoVoxelDev">NeoVoxel Team</a>`
    },
    outline: {
      level: [1, 6],
      label: '目录'
    },
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    outlineTitle: '当前页大纲',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

  }
}