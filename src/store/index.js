import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {}
  },
  //用于处理数据
  mutations: {
    updateUserInfo(state,data){
      state.userInfo = data
    },
    updateUserName(state,name){
      state.userInfo.user=name
    }
  },
  actions: {
  },
  modules: {
  }
})
