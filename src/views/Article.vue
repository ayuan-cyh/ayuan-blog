<template>
  <div id="Article">
    <article v-for="(item,index) in articleList" :key="index">
      <h2>{{ item.title }}</h2>
      <div class="time">
        <p class="date">{{ new Date(item.date).getDate() }}</p>
        <p class="m-y">
          <span>{{ new Date(item.date).getMonth() + 1 }}月</span>
          <span>{{ new Date(item.date).getFullYear() }}</span>
        </p>
      </div>
      <div class="show">
        <div
            class="img"
            :style="{
          backgroundImage: `url(${coverImg})`
          }"
        ></div>
        <div class="des">
          {{ item.des }}
        </div>
      </div>
      <div class="r-b">
        <p>浏览量：{{ item.pv }}</p>
        <router-link :to="`/article/${item._id}`">阅读全文</router-link>
      </div>
    </article>
  </div>

</template>


<script>
export default {
  name: "Article",
  data() {
    return {
      articleList: [],
      coverImg: require("../assets/img/article/1.jpg")
    }
  },
  methods: {
    async getAll() {
      let {data} = await this.$axios({
        method: "get",
        url: "/art/all",

      })
      if (data.code) {
        return this.$message.error("文章列表查询失败")
      }
      this.articleList = data.data
    }
  },
  created() {
    this.getAll()
  }
}
</script>

<style lang="less" scoped>
#Article {
  flex: 1;

  article {
    box-sizing: border-box;
    position: relative;
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

    .time {
      position: absolute;
      top: 0;
      right: 10px;
      width: 80px;

      .date {
        font-weight: bolder;
        font-size: 40px;
        text-align: center;
        color: #6bc30d;
      }

      .m-y {
        span:nth-child(1) {
          float: left;
        }

        span:nth-child(2) {
          float: right;
        }
      }
    }

    .show {
      display: flex;
      width: 100%;
      height: 250px;

      .img {
        box-sizing: border-box;
        width: 50%;
        padding-right: 1%;
        background-size: cover;
        background-position: center;
      }

      .des {
        box-sizing: border-box;
        width: 50%;
        padding-left: 1%;
      }
    }

    .r-b {
      position: absolute;
      right: 20px;
      bottom: 20px;

      p {
        position: relative;
        top: -10px;
        color: #aaa;
        font-size: 12px;
      }

      a {
        padding: 10px 20px;
        background-color: #409eff;
        color: #fff;
        transition: opacity 0.3s;
      }
    }
  }
}
</style>