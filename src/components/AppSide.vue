<template>
  <div id="AppSide">
    <!--    个人信息-->
    <Personal></Personal>
    <!--    用于固定定位的盒子-->
    <div class="fixed"
      :class="{true:ifFixed}"
    >
      <!--    热门文章-->
      <HotArticle></HotArticle>
      <!--    最近访客-->
      <Visitor></Visitor>
    </div>

  </div>
</template>

<script>
import Personal from "@/components/AppSide/Personal";
import HotArticle from "@/components/AppSide/HotArticle";
import Visitor from "@/components/AppSide/Visitor";

export default {
  name: "AppSide",
  data(){
    return{
      ifFixed:""
    }
  },
  components: {
    Personal, HotArticle, Visitor
  },
  methods:{
    scrollEventFn(){
      let scrollTop=document.body.scrollTop||document.documentElement.scrollTop
      this.ifFixed=scrollTop>=240?"true":""
    }
  },
//  页面渲染完成钩子
  mounted() {
    this.scrollEventFn();//手动进行调用一次
    window.addEventListener("scroll",this.scrollEventFn)
  }
}
</script>

<style lang="less" scoped>
#AppSide {
  width: 270px;
  margin-right: 15px;
  .fixed.true{
    position: fixed;
    top: 65px;
    width: 270px;
    z-index: -1;
  }
}
</style>
