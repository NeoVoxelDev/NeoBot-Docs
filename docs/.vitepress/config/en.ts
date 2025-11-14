import { enNav } from '../navbar'
import { enSidebar } from '../sidebar'
import dayjs from 'dayjs'
import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    lastUpdatedText: 'Last updated',
    returnToTopLabel: 'Return to top',
    nav: enNav,
    sidebar: enSidebar,
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
    darkModeSwitchLabel: 'Toggle theme',
    sidebarMenuLabel: 'Menu',
    lightModeSwitchTitle: 'Switch to light mode',
    darkModeSwitchTitle: 'Switch to dark mode',
    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">LGPL-3 License</a>.',
      copyright: `Copyright © ${dayjs().format("YYYY")} <a href="https://github.com/NeoVoxelDev">NeoVoxel Team</a>`
    },
    outline: {
      level: [1, 6],
      label: 'Contents'
    },
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    outlineTitle: 'Page outline',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  }
}