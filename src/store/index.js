//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {
    userType(context,value){
        let user = JSON.parse(value)
        context.commit('TYPE',user)
    }
}
//准备mutations对象——修改state中的数据
const mutations = {
    TYPE(state,value){
        state = value
    },
    AVATAR(state,value){
        state.backColor = value.backColor
        state.fontColor = value.fontColor
    }
}
//准备state对象——保存具体的数据
const state = {

}
const getters = {
    getColor(state){
        return `background-color:${state.backColor};color:${state.fontColor}`
    },
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
    getters
})