import {createApp} from "vue";
import App from "./App.vue";
//添加路由
import router from "./router";
//添加基本css文件
import store from "./store";
import lazyPlugin from "vue3-lazy";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {theme} from "@/mixin/global/theme";
import mitt from "mitt"
const app = createApp (App);
app.use (router);
app.use (store);
app.config.globalProperties.$bus = mitt()
//定义theme 为全局 变量
app.mixin(theme);
app.use(ElementPlus);
app.use(lazyPlugin,{
    loading: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
})
app.mount ("#app");
