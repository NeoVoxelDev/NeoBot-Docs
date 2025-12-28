<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMenuOpen = ref(false)
const isCursorEnabled = ref(true)
const isSmoothScrollEnabled = ref(true)

let customCursorInstance: any = null
let smoothScrollInstance: any = null

const handleMouseEnter = () => {
  isMenuOpen.value = true
}

const handleMouseLeave = () => {
  isMenuOpen.value = false
}

const toggleCursor = () => {
  isCursorEnabled.value = !isCursorEnabled.value
  if (isCursorEnabled.value) {
    if (typeof window !== 'undefined' && window.CustomCursor) {
      customCursorInstance = new window.CustomCursor()
    }
  } else {
    if (customCursorInstance) {
      customCursorInstance.destroy()
      customCursorInstance = null
    }
    // 移除恢复鼠标样式的标签
    const restoreStyle = document.getElementById('restore-cursor-style')
    if (restoreStyle) {
      restoreStyle.remove()
    }
  }
}

const toggleSmoothScroll = () => {
  isSmoothScrollEnabled.value = !isSmoothScrollEnabled.value
  if (isSmoothScrollEnabled.value) {
    if (typeof window !== 'undefined' && window.SmoothScroll) {
      smoothScrollInstance = new window.SmoothScroll()
      window.smoothScroll = smoothScrollInstance as any
    }
  } else {
    if (smoothScrollInstance) {
      smoothScrollInstance.destroy()
      smoothScrollInstance = null
    }
    if (typeof window !== 'undefined') {
      window.smoothScroll = undefined
    }
  }
}

onMounted(() => {
  if (typeof window !== 'undefined' && window.CustomCursor) {
    customCursorInstance = new window.CustomCursor()
    isCursorEnabled.value = true
  }
  if (typeof window !== 'undefined' && window.SmoothScroll) {
    smoothScrollInstance = new window.SmoothScroll()
    window.smoothScroll = smoothScrollInstance
    isSmoothScrollEnabled.value = true
  }
})

onBeforeUnmount(() => {
  if (customCursorInstance) {
    customCursorInstance.destroy()
  }
  if (smoothScrollInstance) {
    smoothScrollInstance.destroy()
  }
})
</script>

<template>
  <div class="appearance-menu-container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="control-panel-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
        </path>
      </svg>
    </div>

    <div class="appearance-menu" :class="{ 'is-open': isMenuOpen }">
      <div class="menu-item" @click="toggleCursor">
        <span class="menu-label">灵动光标</span>
        <div class="switch" :class="{ 'is-active': isCursorEnabled }">
          <div class="switch-slider"></div>
        </div>
      </div>
      <div class="menu-divider"></div>
      <div class="menu-item" @click="toggleSmoothScroll">
        <span class="menu-label">惯性滚动</span>
        <div class="switch" :class="{ 'is-active': isSmoothScrollEnabled }">
          <div class="switch-slider"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appearance-menu-container {
  position: relative;
  display: inline-block;
}

.control-panel-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--vp-c-text-1);
  transition: background-color 0.2s;
}

.control-panel-button:hover {
  background-color: var(--vp-c-bg-soft);
}

.appearance-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.2s ease;
  z-index: 100;
}

.appearance-menu.is-open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: var(--vp-c-bg-soft);
}

.menu-label {
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.menu-divider {
  height: 1px;
  background-color: var(--vp-c-divider);
  margin: 0;
}

.switch {
  position: relative;
  width: 40px;
  height: 20px;
  background-color: #d1d5db;
  border-radius: 10px;
  transition: background-color 0.2s;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
}

.switch.is-active {
  background-color: #3b82f6;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
}

.switch-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.switch.is-active .switch-slider {
  transform: translateX(20px);
}
</style>
