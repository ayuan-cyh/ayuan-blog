<template>
<div id="About">
<!--  about me-->
  <article>
    <h2>ABOUT ME</h2>
    <p>也没有什么好形容的自己,一个热爱互联网行业的普通人,还有着许许多多不足的地方,但是也在慢慢的努力😄,什么东西都会点,喜欢琢磨一些稀奇古怪的东西,喜欢看动漫和日剧,未来发展方向是全栈,因为前后端其实都是有兴趣的,目前的后端也可以应付些小型的项目,前端主要方向还是Vue</p>
  </article>
<!--  about site-->
  <article>
    <h2>About DEMO</h2>
    <p><code>前  端：</code><span class="code">Vue + Element</span></p>
    <p><code>后  端：</code><span class="code">Node + Express + Mongodb</span></p>
    <p class="border"><code>服务器：</code><a target="_blank" href="https://www.aliyun.com/1111/new?userCode=xqfx5ty6">阿里云ECS</a></p>
      <p></p>
  </article>
  <!--ABOUT COPYRIGHT-->
  <article>
    <h2>ABOUT Web SITE</h2>
    <p>由于服务器性能和网络带宽较小,所以网站进行了CDN优化和后端GZIP压缩,因为这个项目搁置时间有点长,没有找到旧版本合适免费的加速CDN,使用了其他版本的CDN加速可能存在部分不兼容,后续在测试过程会慢慢改进.后台管理员地址为/adminc
      账号:root 密码:adminc
    </p>
  </article>

  <!--OTHER-->
  <article>
    <h2>OTHER</h2>
    <p>我是一名热爱互联网的青年，也是一名即将毕业向往未来的学生，可以通过 <a href="/#contact">contact me</a> 联系我。或者可以在👈左侧边栏找到我的联系方式哦。,可以直接通过下方的Contact发送邮箱给我😀</p>
  </article>
</div>
</template>

<style lang="less" scoped>
#About {
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
      &.border{
        border-bottom: 1px dotted rgb(170, 170, 170);
      }
    }

    code{
      text-indent: 0;
      display: inline-block;
      font-family: "Quicksand";
      font-size: 14px;
    }
    span.code{
      color: #bd4147;
      background-color: rgba(27, 31, 35, 0.05);
      font-weight: 700;
    }
    a{
      color: #409eff;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}

</style>
