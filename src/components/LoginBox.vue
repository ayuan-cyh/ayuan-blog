<template>
  <div id="LoginBox" @click="closeBox">
    <div class="main" @click.stop>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户登陆" name="login">
          <el-form
              :model="loginForm"
              :rules="rules"
              ref="loginForm"
              label-width="70px"
          >
            <el-form-item label="用户名" prop="user">
              <el-input v-model="loginForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="loginForm.pass"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loginSubmit">立即登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册账号" name="register">
          <el-form
              :model="regForm"
              :rules="rules"
              ref="regForm"
              label-width="70px"
          >
            <el-form-item label="用户名" prop="user">
              <el-input v-model="regForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="regForm.pass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="pass2">
              <el-input type="password" v-model="regForm.pass2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="regSubmit">立即注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex"

export default {
  name: "LoginBox",
  data() {
    return {
      activeName: "register",
      regForm: {
        user: "",
        pass: "",
        pass2: ""
      },
      loginForm: {
        user: "",
        pass: ""
      },
      rules: {
        user: [{
          validator(rule, value, callback) {
            let reg = /^[^\s]{2,8}$/
            if (reg.test(value)) {
              callback()
            } else {
              callback(new Error("2-8位非空字符"))
            }
          },
          //触发方式
          trigger: "blur"
        }],
        pass: [{
          validator(rule, value, callback) {
            let reg = /^[\w,.?;<>/|\\:'"!@#$%^&*()+-]{6,16}$/
            if (reg.test(value)) {
              callback()
            } else {
              callback(new Error("2-8位非空字符"))
            }
          },
          trigger: "blur"
        }],
        pass2: [{
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error("密码不能为空"))
            } else if (value !== this.regForm.pass) {
              callback(new Error("密码两次不一致"))
            } else {
              callback()
            }
          },
          trigger: "blur"
        }]

      }
    }

  },
  methods: {
    // 绑定vuex
    ...mapMutations(['updateUserInfo']),

    // 注册按钮的绑定点击事件
    regSubmit() {
      this.$refs.regForm.validate(async valid => {
        if (valid) {
          // 将数据发送到后端
          let response = await this.$axios({
            method: "POST",
            url: "/reg",
            data: {
              user: this.regForm.user,
              pass: this.regForm.pass
            }

          })
          //当注册失败时候出发的时间 如果 code不等于0就是失败
          if (response.data.code) {
            return this.$message.error(response.data.msg)
          }
          //当注册成功时候的事件
          this.$message.success("注册成功")
          // 切换到登录的选项卡
          this.activeName = "login"
          this.$refs.regForm.resetFields();
        }


      })
    },
    loginSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          let response = await this.$axios({
            method: "post",
            url: "/login",
            data: this.loginForm
          })
          //  如果没有登录成功触发的事件
          if(response.data.code){
            return this.$message.error(response.data.msg)
          }
        // 登录成功触发事件
          this.$message.success("登录成功")
          // 修改父组件的数据,关闭弹窗 触发自定义事件用于向父级元素传递数据
          this.$emit("loginSuccess");
        //  通过updateUserInfo修改vuex中的数据
          this.updateUserInfo(response.data.data)
        }else{
          return false
        }
      })

    },
    closeBox(){
      this.$emit("loginSuccess")
    }
  }
}
</script>

<style lang="less" scoped>
#LoginBox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);

  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    padding: 10px 30px;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
}
</style>