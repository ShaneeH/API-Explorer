import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import {VueHighlightJS} from 'vue3-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'; 
import VueCodeHighlight from "vue-code-highlight";

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(VueHighlightJS)
  .use(VueCodeHighlight)
  .mount('#app');
