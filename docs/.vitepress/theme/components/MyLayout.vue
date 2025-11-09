<!-- .vitepress/theme/MyLayout.vue -->
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
// 组件1
import backtotop from "./backtotop.vue";
</script>

<template>
  <DefaultTheme.Layout v-bind="$attrs">

    <!-- doc-footer-before插槽 -->
    <template #doc-footer-before>
      <backtotop />
    </template>

  </DefaultTheme.Layout>
</template>

<style scoped>
</style>