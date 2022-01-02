<template>
  <div id="ArticleId">
    <article>
      <div id="article-box"></div>
    </article>
  </div>
</template>

<script>
export default {
  name: "ArticleId",
  methods: {

  },
  async mounted() {

    let {data} = await this.$axios({
      method: "POST",
      url: "/art/address",
      data: {
        _id: this.$route.params.id
      }
    })

    if (data.code) {
      return this.$message.error("文章id错误，查询失败")
    }

    $.get(this.baseURL + data.data, (md) => {
      editormd.markdownToHTML("article-box", {
        markdown: md
      })
    })
  }
}
</script>

<style scoped>
#article-box{
  min-width: 60vw;
}

</style>














