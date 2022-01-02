import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
//引入axios
import axios from "axios";
//是否是开发环境
let ifDEV = process.env.NODE_ENV === "development"
const baseURL = ifDEV?'http://localhost:4000':''
console.log("开发环境")
const app = createApp(App)
installElementPlus(app)
//全局配置axios
axios.defaults.withCredentials=true//让axios携带cookie
axios.defaults.baseURL=baseURL
app.config.globalProperties.$axios=axios


//使用mixin混入数据方便进行图片链接的拼接
app.use(store).use(router).mixin({
    data(){
        return{
            baseURL
        }
    }
}).mount('#app')
