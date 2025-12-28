import { defineConfig } from 'vitepress'
import timeline from "vitepress-markdown-timeline"

import { loadEnv } from 'vite'
const mode = process.env.NODE_ENV || 'development'
const { VITE_BASE_URL } = loadEnv(mode, process.cwd())

console.log('Mode:', process.env.NODE_ENV)
console.log('VITE_BASE_URL:', VITE_BASE_URL)

export const sharedConfig = defineConfig({
  rewrites: {
    'zh/:rest*': ':rest*'
  },
  metaChunk: true,
  lang: 'zh-CN', // 语言
  title: "NeoBot V3 Docs", // 站点名称
  titleTemplate: "Plugins", // 网页标题
  description: "NeoBot、Plugins", // 站点描述
  head: [ // favicon.ico 图标等
    ['link', { rel: "shortcut icon", href: `/image/favicon.ico` }],
    // 网站 favicon.ico 图标
    ['link', { rel: "icon", href: `/image/favicon.ico`, type: "image/x-icon" }],
    // 引入 Google Fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' }],
    // 引入自定义字体 JetBrains Maple Mono
    ['link', { href: 'https://fontsapi.zeoseven.com/521/medium/result.css', onload: "this.rel='stylesheet'", rel: 'preload', as: 'style', crossorigin: '' }],
    ['noscript', {}, ['link', { rel: 'stylesheet', href: 'https://fontsapi.zeoseven.com/521/medium/result.css' }]],
    // 网页视口
    ['meta', { name: "viewport", content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,shrink-to-fit=no" }],
    // 关键词和描述
    ['meta', { name: "keywords", content: "NeoBot,Plugins" }],
    // 自定义字体样式
    ['style', {}, 'body { font-family: "JetBrains Maple Mono"; font-weight: normal; }'],
  ],
  appearance: true,
  base: VITE_BASE_URL,
  lastUpdated: true,
  vite: {
    resolve: {
      alias: {
        'vitepress/theme/components': 'vitepress/dist/client/theme-default/components'
      }
    },
    build: {
      chunkSizeWarningLimit: 1600
    },
    plugins: [],
    server: {
      port: 18089
    }
  },
  markdown: {
    math: true,
    lineNumbers: true,
    image: {
      lazyLoading: true
    },
    config: (md) => {
      md.use(timeline)
    }
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索',
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重制搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: 'enter',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '上方向键',
                  navigateDownKeyAriaLabel: '下方向键',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'esc',
                },
              },
            },
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search',
              },
              modal: {
                displayDetails: 'Display detailed list',
                resetButtonTitle: 'Reset search',
                backButtonTitle: 'Close search',
                noResultsText: 'No results for',
                footer: {
                  selectText: 'to select',
                  selectKeyAriaLabel: 'enter',
                  navigateText: 'to navigate',
                  navigateUpKeyAriaLabel: 'up arrow',
                  navigateDownKeyAriaLabel: 'down arrow',
                  closeText: 'to close',
                  closeKeyAriaLabel: 'escape',
                },
              },
            },
          },
        },
      },
    },
    logo: '/image/logo.svg',
  }
})