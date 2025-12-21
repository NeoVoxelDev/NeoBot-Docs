/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import MyLayout from './components/MyLayout.vue'
import Linkcard from "./components/Linkcard.vue"
import update from "./components/update.vue"
import Confetti from "./components/Confetti.vue";
import TeamMembersCN from '../TeamMembers/VPTeamMembersCN.vue';
import TeamMembersEN from '../TeamMembers/VPTeamMembersEN.vue';
import ArticleMetadata from './components/ArticleMetadata.vue';
import DownloadCN from '../Download/DownloadCN.vue';
import DownloadEN from '../Download/DownloadEN.vue';
import VPCommunityScriptsCN from '../Scripts/VPCommunityScriptsCN.vue';
import VPCommunityScriptsEN from '../Scripts/VPCommunityScriptsEN.vue';
import ApiInterfaceCN from '../Api/ApiInterfaceCN.vue';
import ApiInterfaceEN from '../Api/ApiInterfaceEN.vue';
import './untils/customCursor.ts';
import './untils/smoothScroll.ts';



import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
export default {
  extends: DefaultTheme,
  markdown: {
    // 组件插入h1标题下
    config: (md: any) => {
      md.renderer.rules.heading_close = (tokens: any, idx: any, options: any, env: any, slf: any) => {
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
      mediumZoom(".main img", { background: "var(--vp-c-bg)" });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
  enhanceApp({ app }: any) {
    // 注册全局组件
    app.component('update', update);
    app.component('Linkcard', Linkcard);
    app.component("Confetti", Confetti);
    app.component('TeamMembersCN', TeamMembersCN);
    app.component('TeamMembersEN', TeamMembersEN);
    app.component('ArticleMetadata', ArticleMetadata);
    app.component('DownloadCN', DownloadCN);
    app.component('DownloadEN', DownloadEN);
    app.component('VPCommunityScriptsCN', VPCommunityScriptsCN);
    app.component('VPCommunityScriptsEN', VPCommunityScriptsEN);
    app.component('ApiInterfaceCN', ApiInterfaceCN);
    app.component('ApiInterfaceEN', ApiInterfaceEN);
  },
  Layout: MyLayout
}

