import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:"首页"
    }
  },
  {
    path:"/about",
    name:"About",
    component: ()=>import("../views/About"),
    meta:{
      title:"关于"
    }
  },
  {
    path:"/article",
    name:"Article",
    component: ()=>import("../views/Article"),
    meta:{
      title:"文章"
    }
  },
  {
    path:"/article/:id",
    name:"ArticleId",
    component: ()=>import("../views/ArticleId"),
    meta:{
      title:"文章内容"
    }
  },
  {
    path:"/link",
    name:"Link",
    component: ()=>import("../views/Link"),
    meta:{
      title:"友链"
    }
  },
  {
    path:"/message",
    name:"Message",
    component: ()=>import("../views/Message"),
    meta:{
      title:"留言"
    }
  },
  {
    path:"/userc",
    name:"Userc",
    component: ()=>import("../views/UserC"),
    meta: {
      title:"用户"
    }
  },
  {
    path:"/adminc",
    name:"AdminC",
    component: ()=>import("../views/AdminC"),
    meta:{
      title:"管理员"
    }
  },
  {
    //配置404页面
    path:"/:xx(.*)*",
    name:"404",
    component: ()=>import("../views/404"),
    meta:{
      title:"404"
    }
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from)=>{
  document.title=to.meta.title
})

export default router
