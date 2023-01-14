import { defineClientConfig } from '@vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(ElementPlus)
  },
  setup() {},
  rootComponents: []
})
