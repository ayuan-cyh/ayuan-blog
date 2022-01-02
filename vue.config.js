//  默认导出
module.exports = {
    chainWebpack: config => {
        //如果是生成环境,执行下面的代码
        config.when(process.env.NODE_ENV === 'production', config => {
            // 将生产环境的入口文件指向src目录下的main-prod目录下
            config.entry('app').clear().add('./src/main-prod.js')
            //  过滤文件 过滤文件在生成静态文件不会经常webpack编译进去
            config.set('externals', {
                'axios': 'axios',
                'vue': 'Vue',
                'element-plus': 'ElementPlus'
            })
            // 给html添加一个isProd属性值为true 用来区别是否生成环境动态改变html
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })
        //如果是开发环境,执行下面的代码
        config.when(process.env.NODE_ENV === 'development', config => {
            // 将开发环境的入口文件指向src目录下的main.dev.js
            config.entry('app').clear().add('./src/main-dev.js')
            // 给html添加一个isProd属性值为false 用来区别是否生成环境动态改变html
            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }


}

