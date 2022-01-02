<template>
  <div id="UserPhoto" @click="goUserC">
    <div
        class="img"
        :style="{
            backgroundImage: `url(${baseURL}${userInfo.photo})`
          }"
        :title="userInfo.user"
    ></div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import {mapMutations} from "vuex"

export default {
  name: "UserPhoto",
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    // 跳转到用户中心的事件
    goUserC(){
      this.$router.push({name:'Userc'})
    }

  }
}
</script>

<style scoped>
.elBox {
  position: fixed;
  right: 0;
  top: 0;
  background: none;
}

.btn {
  position: fixed;
  right: 0;
  top: 0;
  background: none;

}

.img {
  width: 40px;
  height: 40px;
  background-size: cover;
  background-position: center top;
  border-radius: 50%;
  margin-top: 5px;
}

.second {
  margin-left: 0 !important;
}
</style>
