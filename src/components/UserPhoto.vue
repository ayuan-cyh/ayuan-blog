<template>
<div id="UserPhoto">
  <el-popover
      placement="bottom-end"
      trigger="hover"
      :width="160"
  >
    <template #reference>
      <div
          class="img"
          :style="{
            backgroundImage: `url(${baseURL}${userInfo.photo})`
          }"
          :title="userInfo.user"
      ></div>
    </template>
    <!--hover之后，显示的内容-->
    <div class="btn">
      <el-button
          type="primary"
          size="mini"
          @click="userUpdate"
      >修改资料
      </el-button>
      <el-button
          class="second"
          type="danger"
          size="mini"
          @click="logout"
      >退出登录
      </el-button>
    </div>

  </el-popover>
</div>
</template>

<script>
import {mapState} from "vuex"
import {mapMutations} from "vuex"

export default {
  name: "UserPhoto",
  computed:{
    ...mapState(['userInfo']),
  },methods:{
    ...mapMutations(['updateUserInfo']),
    async logout(){
      await this.$axios({
        method:"post",
        url:"/login/logout"
      })
      this.$message.success("退出登录成功")
      // 清除vuex中的数据
      this.updateUserInfo({})
    },
    //修改按钮点击触发的点击事件
    userUpdate(){
      this.$router.push("/userC")
    }

  }
}
</script>

<style scoped>
.img{
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