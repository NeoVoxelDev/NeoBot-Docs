<!-- .vitepress/theme/MyLayout.vue -->
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import backtotop from "./backtotop.vue"
import AppearanceMenu from "./AppearanceMenu.vue"
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