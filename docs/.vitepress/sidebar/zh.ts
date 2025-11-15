import { DefaultTheme } from 'vitepress'
export const zhSidebar: DefaultTheme.Sidebar = {
  '/': [
    { text: '简介', link: '/description' },
    {
      text: '使用指南',
      collapsed: false,
      items: [
        { text: '快速开始', link: `/quick-started` },
      ]
    },
    {
      text: '配置文件',
      collapsed: false,
      items: [
        { text: '主配置', link: `/config/config` },
        { text: '语言文件', link: `/config/messages` },
      ]
    },
    {
      text: '脚本市场',
      collapsed: false,
      items: [
        { text: 'NeoVoxel官方扩展', link: `/config/scripts/NeoVoxel-Scripts` },
        { text: '上传扩展', link: `/config/scripts/Upload-Scripts` },
      ]
    },
    {
      text: '脚本开发',
      collapsed: false,
      items: [
        { text: '接口文件', link: `/config/scripts/NeoBot` },
      ]
    },
  ]
}