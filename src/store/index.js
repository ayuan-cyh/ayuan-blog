import {createStore} from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        // 用户信息数据
        userInfo: {},
        // 访客记录数据
        visitorList: [],
    },
    //用于处理数据
    mutations: {

        //更新用户数据方法
        updateUserInfo(state, data) {
            state.userInfo = data
        },
        // 更新用户名的方法
        updateUserName(state, name) {
            state.userInfo.user = name
        },
        //设置访客数据
        SetVisitorList(state,data){
            state.visitorList=data
        }

    },
    actions: {
        //  发送网络请求获取最新访客记录
        async getVisitorList(context,val){
            let {data} = await axios({
                method: "get",
                url: "/visitor"
            })
            if (data.code) {
                return this.$message.error("访客查询失败")

            }
            console.log(context,val)
            context.commit('SetVisitorList',data.data)
        }

    },
    modules: {}
})
