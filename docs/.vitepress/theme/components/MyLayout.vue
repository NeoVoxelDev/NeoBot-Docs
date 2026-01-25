<!-- .vitepress/theme/MyLayout.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import DefaultTheme from 'vitepress/theme'
import backtotop from "./backtotop.vue"
import AppearanceMenu from "./AppearanceMenu.vue"

const enableTransitions = () => {
  return 'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

const handleThemeToggle = async (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()

  if (!enableTransitions()) {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
    } else {
      html.classList.add('dark')
    }
    return
  }

  const { clientX: x, clientY: y } = event
  document.documentElement.style.setProperty('--darkX', x + 'px')
  document.documentElement.style.setProperty('--darkY', y + 'px')

  await document.startViewTransition(async () => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
    } else {
      html.classList.add('dark')
    }
  }).ready
}

const setupThemeToggle = () => {
  const themeToggleButtons = document.querySelectorAll('.VPSwitchAppearance')
  themeToggleButtons.forEach(button => {
    button.addEventListener('click', handleThemeToggle as unknown as EventListener, { capture: true })
  })
}

const cleanupThemeToggle = () => {
  const themeToggleButtons = document.querySelectorAll('.VPSwitchAppearance')
  themeToggleButtons.forEach(button => {
    button.removeEventListener('click', handleThemeToggle as unknown as EventListener, { capture: true } as any)
  })
}

onMounted(() => {
  setupThemeToggle()

  if (typeof window !== 'undefined') {
    // @ts-ignore
    import('../untils/CRCMenu.v3-A.js')
  }
})

onBeforeUnmount(() => {
  cleanupThemeToggle()
})
</script>

<template>
  <DefaultTheme.Layout v-bind="$attrs">
    <template #nav-bar-content-after>
      <AppearanceMenu />
    </template>

    <template #doc-footer-before>
      <backtotop />
    </template>
  </DefaultTheme.Layout>
</template>

<style scoped></style>