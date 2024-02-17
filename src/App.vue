<template>
  <div id="app">
    <Container></Container>
  </div>
</template>

<script>
  import Container from './components/Container.vue'

  export default {
    name: 'App',
    components: {
      Container,
    },
    beforeCreate() {
      sessionStorage.setItem('user', JSON.stringify({
        userId: 1,
        userType: 0,
        userName: 'admin',
        realName: '张三',
        sex:'男',
        birth:'2000-01-01',
        backColor:'#8cc7b5',
        fontColor:'#FFF'
      }))
      alert('测试数据已挂载');
    },
    created() {

      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("user") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("user"))))
      }
 
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("user",JSON.stringify(this.$store.state))
      })
 
      //ios废弃了beforeunload，使用pagehide代替
      window.addEventListener("pagehide",()=>{
        sessionStorage.setItem("user",JSON.stringify(this.$store.state))
      })
    },
  }
</script>

<style>
  * {
    margin: 0px;
  }
</style>