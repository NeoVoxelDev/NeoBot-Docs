/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import MyLayout from './components/MyLayout.vue'
import update from "./components/update.vue"
export default {
  extends: DefaultTheme,
  enhanceApp({app}) { 
    // 注册全局组件
    app.component('update' , update)
  },
  Layout: MyLayout
}

