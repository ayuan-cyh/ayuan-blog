<template>
  <div id="app">
    <!--  顶部导航条-->
    <AppNav></AppNav>
    <!--  内容部分-->
    <div id="main">
      <!--    左侧边栏-->
      <div class="app-side">
        <AppSide></AppSide>
      </div>
      <!--    路由页面-->
      <router-view ></router-view>
    </div>

  </div>

</template>

<script>

import AppNav from "@/components/AppNav";
import AppSide from "@/components/AppSide";
import {mapMutations}from "vuex"

export default {
  name: 'App',
  components: {
    AppNav, AppSide
  },
  methods:{
    ...mapMutations(["updateUserInfo"])
  },
  async created(){
    // 检测用户是否成功登录
    let {data}=await this.$axios({
      method:"post",
      url:"/login/check"
    })
    if (data.code)return

    // 如果成功登录则修改vuex中的头像数据代表登录成功
   this.updateUserInfo(data.data)
  }
}
</script>

<style>
/*
全局引入css文件 reset清除默认样式 font特殊字体
*/
@import "./assets/css/reset.css";
@import "assets/css/font.css";
@import "./assets/css/font/iconfont.css";

/*自定义滚动条*/
::-webkit-scrollbar {/*滚动条整体样式*/
  width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,167,232,.3);
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 10px;
  background: #EDEDED;
}
body {
  background: url("./assets/img/bg/bg-left.png") no-repeat left 50px, url("./assets/img/bg/bg-right.png") no-repeat right 50px;
  background-color: #f2f2f2;
}

#main {
  display: flex;
  max-width: 1300px;
  padding: 60px 15px;
  margin-top: 15px;
  margin: 0 auto;


}
#app{
  min-width: 900px;
}
.app-side{
  width: 270px;
  margin-right: 15px;
}

</style>
