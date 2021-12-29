<template>
  <div id="AdminArticleAdd">
    <el-tag
    >请上传.md文件
    </el-tag>
    <el-upload
        class="upload-demo"
        ref="upload"

        :action="baseURL+'/admin/upload'"
        :file-list="fileList"
        :on-success="handleMDSuccess"
        :with-credentials="true"
        :auto-upload="false">
      <template #trigger>
        <el-button size="small" type="primary">选取文件</el-button>
      </template>
      <br>
    </el-upload>
    <el-input
        style="margin-top: 20px" v-model="title" placeholder="请输入文章标题"></el-input>
    <el-input v-model="des" placeholder="请输入文章描述"></el-input>


    <el-button
        style="margin-top: 20px;"
        size="small"
        type="success"
        @click="submitUpload"
    >上传到服务器
    </el-button>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "AdminArticleAdd",
  data() {
    return {
      title: "",
      des: "",
      fileList: []
    }
  },
  methods: {
    //点击上传到服务器触发的事件
    submitUpload() {
      if (!this.title.trim() || !this.des.trim()) {
        return this.$message.error("请输入文章信息上传")
      }
      //触发上传事件
      this.$refs.upload.submit();

    },
    //上传成功触发的事件
    async handleMDSuccess(res) {
      //文件上传失败
      if (res.code) {
        return this.$message.error(res.msg)
      }
      // 上传成功
      let {data} = await this.$axios({
        method: "post",
        url: "/admin/articleAdd",
        data: {
          title: this.title.trim(),
          des: this.des.trim(),
          md: res.data.fileName
        }
      })
      this.$message.success(data.msg)
      router.go(0)

    }

  }
}
</script>

<style scoped>

</style>