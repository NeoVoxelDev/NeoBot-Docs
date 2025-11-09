/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import MyLayout from './components/MyLayout.vue'
import Linkcard from "./components/Linkcard.vue"
import update from "./components/update.vue"
import Confetti from "./components/Confetti.vue";
import VPTeamMembers from './components/VPTeamMembers.vue';
import ArticleMetadata from './components/ArticleMetadata.vue';
import download from './components/download.vue';
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
export default {
  extends: DefaultTheme,
  markdown: {
    // 组件插入h1标题下
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`; 
          return htmlResult;
      }
    }
  },
  setup() {
      const route = useRoute();
      const initZoom = () => {
        // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
        mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
      };
      onMounted(() => {
        initZoom(); 
      }); 
      watch(  
        () => route.path,
        () => nextTick(() => initZoom())
      );
    },
  enhanceApp({app}) { 
    // 注册全局组件
    app.component('update' , update);
    app.component('Linkcard' , Linkcard);
    app.component("Confetti", Confetti);
    app.component('VPTeamMembers', VPTeamMembers);
    app.component('ArticleMetadata', ArticleMetadata);
    app.component('download', download);
  },
  Layout: MyLayout
}

