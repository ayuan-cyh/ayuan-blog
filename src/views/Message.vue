<template>
  <div id="Message">
    <article>
      <h2>留言板</h2>
      <p>请文明发言，禁止广告。不然拉黑了嗷\(^o^)/~</p>
      <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          maxlength="100"
          show-word-limit
          v-model="msg">
      </el-input>
      <div class="btn">
        <i class="iconfont icon-biaoqing bq" @click.stop="showEmoji"></i>
        <el-button type="primary" size="mini" @click="handleMessageSubmit">发表</el-button>
        <div
            class="emoji"
            :class="{
            show: ifEmojiShow
          }"
        >
          <ul>
            <li
                v-for="(item,index) in emoji"
                :key="index"
                @click="handleEmojiClick(item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>

      </div>
    </article>

    <article class="content">
      <ul>
        <li v-for="(item,index) in msgList" :key="item._id">
          <!--父留言-->
          <div class="parent">
            <!--留言-->
            <div class="left">
              <!--用户头像-->
              <img :src="baseURL+item.user.photo" alt="">
            </div>
            <div class="right">
              <div class="name-time">
                <!--用户名-->
                <span>{{ item.user.user }}</span>
                <!--留言时间-->
                <span>{{ formatDate(item.date) }}</span>
              </div>
              <div class="message">
                <!--留言内容-->
                {{ item.msg }}
              </div>
              <div class="like-reply">
                <i
                    :class="{
                  isLike:userInfo._id&&(item.likes.indexOf(userInfo._id)!==-1)
                    }"
                    @click="handleLikesClick(item)"
                    class="like iconfont icon-xinaixin"
                ></i>
                <!--点赞数-->
                <span>{{ item.likes.length }}</span>
                <!--                发表回复图片-->
                <i
                    class="reply iconfont icon-huifu"
                    @click="handleReplyClick(item,item.user)"
                ></i>
              </div>
            </div>
          </div>
          <!--子留言-->
          <div class="child" v-for="(childItem,index) in item.children" :key="index">
            <div class="left">
              <img :src="baseURL+childItem.user.photo" alt="">
            </div>
            <div class="right">
              <div class="name-time">
                <span>{{ childItem.user.user }}</span>
                <span>{{ formatDate(childItem.date) }}</span>
              </div>
              <div class="message">
                <span>@{{ childItem.replyUser.user }}</span>
                {{ childItem.msg }}


              </div>
              <div class="like-reply">
                <i
                    :class="{
                   isLike: userInfo._id && (childItem.likes.indexOf(userInfo._id) !== -1)
                    }"
                    @click="handleLikesClick(item,childItem)"
                    class="like iconfont icon-xinaixin"
                ></i>
                <span>{{ childItem.likes.length }}</span>
                <i
                    @click="handleReplyClick(item,childItem.user)"
                    class="reply iconfont icon-huifu"
                ></i>
              </div>
            </div>
          </div>
          <!--          回复框-->
          <div
              class="replyInput"
              :class="{
              'show': item.ifShowReply
            }"
          >
            <el-input
                v-model="item.reply"
                :placeholder="'@ '+item.replyUser.user"
                size="mini"
            ></el-input>
            <el-button
                class="replyBtn"
                type="primary"
                size="mini"
                @click="handReplySubmit(item)"
            >回复
            </el-button>
            <div class="clear"></div>
          </div>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  name: "Message",
  data() {
    return {
      msg: "",
      emoji: [
        "😃", "😁", "😂", "😊", "🙃", "🥰", "😘", "🤭", "🤔", "😏",
        "😵", "😟", "🙁", "😳", "😰", "😭", "😖", "😡", "😠", "😈",
        "🤡", "☠️", "👻", "🙈", "🙉", "❤️", "💖", "💢", "💣", "💤",
        "👋", "👍", "👌", "🤞", "🤟", "🤙", "👊", "🖕", "🤝", "🙏",
        "🙅", "🙅‍♂️", "👨‍✈️", "👩‍✈️", "👷", "👷‍♀️", "🤦", "🤦‍♂️", "👴", "🧓",
        "🐴", "🐮", "🐖", "🐑", "🐓", "🦚", "🐲", "🐳", "🐟", "🐌",
      ],
      ifEmojiShow: false,
      msgList: []

    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    //点击图片显示emoji
    showEmoji() {
      this.ifEmojiShow = true
    },
    //表情点击后添加到输入框
    handleEmojiClick(item) {
      this.msg += item
    },
    // 留言发表触发的事件
    async handleMessageSubmit() {
      // 验证是否登录
      if (!this.userInfo.user) {
        return this.$message.error("请先进行登录操作")
      }

      //  验证输入框是否有内容
      let msg = this.msg.trim()
      if (!msg) {
        return this.$message.error("请输入留言内容留言内容不能为空")
      }

      // 向后端发送请求进行数据交互
      let {data} = await this.$axios({
        url: "/msg/report",
        method: "post",
        data: {msg}


      })
      //  后续处理
      if (data.code) {
        return this.$message.errors(data.msg)
      }

      this.$message.success("留言成功")
      this.msg = ""
      await this.getMsg()
    },

    //请求留言数据
    async getMsg() {
      let {data} = await this.$axios({
        method: "get",
        url: "/msg/get"
      })

      if (data.code) {
        return this.$message.errors("请求留言数据失败请稍后再试试")
      }
      //给后端返回的数据添加新的属性
      data.data.filter(item => {
        //ifShowReply 用于控制回复框的显示或者不显示 给每个留言新增一个属性
        item.ifShowReply = false
        //  用来存储每个留言的回复内容
        item.reply = ""
        //用来存储回复的是谁
        item.replyUser = {}
      })
      // 请求成功
      this.msgList = data.data

    },
    //  处理时间格式
    formatDate(val) {
      let date = new Date(val),
          YY = date.getFullYear(),
          MM = date.getMonth() + 1,
          DD = date.getDate(),
          hh = date.getHours(),
          mm = date.getMinutes(),
          ss = date.getSeconds()

      return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`


    },

    //  回复图标点击触发的事件
    handleReplyClick(item, replyUser) {
      if (!this.userInfo.user) {
        return this.$message.error("请先登录")
      }
      item.ifShowReply = !item.ifShowReply
      item.replyUser = replyUser

    },
    //留言按钮点击触发的事件
    async handReplySubmit(item) {
      let reply = item.reply.trim()
      if (!reply) {
        return this.$message.error("请输入回复的内容")
      }
      let {data} = await this.$axios({
        method: "post",
        url: "/msg/reply",
        data: {
          //留言回复的内容
          msg: reply,
          //回复的是哪一条留言
          _id: item._id,
          //回复的是哪个用户
          replyUserId: item.replyUser._id
        }
      })
      if (data.code) {
        return this.$message.error(data.msg)
      }
      //  子留言回复成功
      this.$message.success(data.msg)
      //  重新请求留言数据
      this.getMsg()

    },

    //点赞触发的事件
    async handleLikesClick(item,childItem){
      let {data}=await  this.$axios({
        method:"post",
        url:"/msg/like",
        data:{
          item,
          childItem
        }
      })
      if (data.code){
        return this.$message.error(data.msg)
      }
      this.getMsg()

    }

  },
  created() {
    //  当页面创建时请求留言数据
    this.getMsg()
  },
  mounted() {
    document.addEventListener("click", () => {
      this.ifEmojiShow = false
    })
  }
}
</script>

<style lang="less" scoped>
#Message {
  flex: 1;

  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: Quicksand;

    h2 {
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
    }

    p {
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;

      &.border {
        border-bottom: 1px dotted rgb(170, 170, 170);
      }
    }

    .el-textarea {
      min-height: 80px;
      margin-top: 20px;
    }

    /deep/ textarea {
      min-height: 80px !important;
      font-family: "Quicksand", "Microsoft YaHei", sans-serif;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
    }

    .btn {
      position: relative;
      display: flex;
      margin-top: 10px;
      justify-content: space-between;

      i.bq {
        font-size: 20px;
        cursor: pointer;
      }

      .emoji {
        display: none;
        position: absolute;
        top: 30px;
        left: 0;
        width: 300px;
        height: 180px;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0 0 5px #aaa;
        border-radius: 3px;
        font-size: 18px;

        &.show {
          display: block;
        }

        &::before {
          content: "";
          position: absolute;
          top: -10px;
          left: 5px;
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-bottom-color: #bbb;
        }

        ul {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          height: 100%;
          border-top: 1px solid #ddd;
          border-left: 1px solid #ddd;

          li {
            box-sizing: border-box;
            width: 30px;
            height: 30px;
            line-height: 29px;
            text-align: center;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
          }
        }

      }
    }


    &.content {
      user-select: none;

      ul {
        li {
          padding-bottom: 5px;
          margin-bottom: 10px;
          border-bottom: 1px dashed #ddd;
          font-size: 12px;
          font-family: "Microsoft YaHei", "sans-serif";

          div.parent, div.child {
            display: flex;
          }

          div.child {
            margin-left: 55px;
            margin-top: 3px;
          }

          div.left {
            overflow: hidden;
            width: 40px;
            height: 40px;
            margin-right: 15px;
            border-radius: 50%;

            img {
              width: 100%;
              height: 100%;
            }
          }

          div.right {
            flex: 1;

            div.name-time {
              font-size: 12px;
              margin-bottom: 3px;

              span:nth-child(1) {
                color: #73b899;
              }

              span:nth-child(2) {
                color: #aaa;
                margin-left: 10px;
                font-family: "Microsoft YaHei", "sans-serif";
              }
            }

            div.message {
              color: #666;
              letter-spacing: 2px;
              margin-bottom: 3px;
              word-break: break-word;

              span {
                color: #409eff;
                margin-right: 5px;
              }
            }

            div.like-reply {
              i {
                cursor: pointer;
                font-size: 14px;
                color: #aaa;
              }

              i.isLike {
                color: #f30606;
              }

              span {
                display: inline-block;
                width: 43px;
                font-size: 12px;
                color: #aaa;
              }
            }
          }
        }
      }
    }

    .replyInput {
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-left: 55px;
      transition: height .3s;

      &.show {
        height: 60px;
      }

      .replyBtn {
        padding: 4px 9px !important;
        float: right;
      }
    }

  }
}
</style>