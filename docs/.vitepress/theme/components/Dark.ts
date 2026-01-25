import { nextTick, provide } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()

const enableTransitions = () => {
  return 'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

export const toggleDark = () => {
  return async (event: MouseEvent) => {
    const { clientX: x, clientY: y } = event

    if (!enableTransitions()) {
      isDark.value = !isDark.value
      return
    }

    document.documentElement.style.setProperty('--darkX', x + 'px')
    document.documentElement.style.setProperty('--darkY', y + 'px')

    await document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    }).ready
  }
}
