import { DefaultTheme } from 'vitepress'
export const enSidebar: DefaultTheme.Sidebar = {
  '/en/': [
    { text: 'Introduction', link: '/en/description' },
    {
      text: 'User Guide',
      collapsed: false,
      items: [
        { text: 'Quick Start', link: `/en/quick-started` },
      ]
    },
    {
      text: 'Configuration',
      collapsed: false,
      items: [
        { text: 'Main Configuration', link: `/en/config/config` },
        { text: 'Language Files', link: `/en/config/messages` },
      ]
    },
    {
      text: 'Script Marketplace',
      collapsed: false,
      items: [
        { text: 'NeoVoxel Official Extensions', link: `/en/config/scripts/neovoxel-scripts` },
        { text: 'Upload Extensions', link: `/en/config/scripts/upload-scripts` },
        { text: 'NeoBot Community Scripts Repository', link: `/en/config/scripts/community-scripts/repo` },
      ]
    },
    {
      text: 'Script Development',
      collapsed: false,
      items: [
        { text: 'API Documentation', link: `/en/config/scripts/neobot` },
      ]
    },
    {
      text: 'Contributing',
      collapsed: false,
      items: [
        { text: 'Documentation Contribution', link: `/en/contribution/contribution` },
        { text: 'Writing Guidelines', link: `/en/contribution/writing-guide-summary` },
        { text: 'Todo List', link: `/en/contribution/todos` },
      ]
    },
  ]
}