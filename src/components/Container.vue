<template>
  <el-container>
    <el-container>
      <el-aside width="200px">
        <div class="userBlock">
          <h2>BILL账单管理</h2>
        </div>
        <!-- <el-divider></el-divider> -->
        <el-row>
          <el-col>
            <el-menu :unique-opened='true' background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
              :router="true" :default-active="$route.path">

              <el-menu-item index="/">
                <i class="el-icon-house"></i>
                <span slot="title">主页</span>
              </el-menu-item>

              <el-menu-item index="/bill">
                <i class="el-icon-s-order"></i>
                <span slot="title">账单管理</span>
              </el-menu-item>

              <el-menu-item index="/provider">
                <i class="el-icon-s-shop"></i>
                <span slot="title">供应商管理</span>
              </el-menu-item>

              <el-menu-item index="/user" :disabled="userAccess">
                <i class="el-icon-user-solid"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <div class="headerTitle">
            <span>一蓑</span>
            <el-divider direction="vertical"></el-divider>
            <span>一笠</span>
            <el-divider direction="vertical"></el-divider>
            <span>一扁舟</span>
          </div>
          <div class="headerItem">
            <el-menu :default-active="$route.path" mode="horizontal" :router="true">
              <el-submenu index="/personal">
                <template slot="title">
                  <el-avatar :style="getColor"> {{userName}} </el-avatar>
                  我的工作台
                </template>
                <el-menu-item index="/personal">
                  <i class="el-icon-info"></i>
                  <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item index="/password">
                  <i class="el-icon-s-tools"></i>
                  <span slot="title">密码修改</span>
                </el-menu-item>
                <!-- </router-link> -->
                <el-menu-item @click="logout" index="/quit">
                  <i class="el-icon-error"></i>
                  <span slot="title">退出登录</span>
                </el-menu-item>
              </el-submenu>

              <el-link @click="drawer = true">打开侧边记事本</el-link>
            </el-menu>
          </div>
          <el-drawer title="记事本" :visible.sync="drawer" :before-close="handleClose">
            <p class="noteWarning">注意:记事本将会把内容存至本地,确认这是您自己的计算机</p>
            <el-input type="textarea" :rows="25" placeholder="请输入内容" v-model="notes">
            </el-input>
          </el-drawer>
        </el-header>
        <el-main :style="getWallPaper" class="wallPaper">
          <router-view></router-view>
          <!-- <billContainer></billContainer> -->
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>
  a {
    text-decoration: none;
  }

  .el-header {
    text-align: left;
    line-height: 60px;
    font-size: 18px;
  }

  .el-aside {
    text-align: center;
    background-color: #545c64;
  }

  .el-main {
    background-color: #f3f3f3;
    /* color: #333; */
    height: calc(100vh - 60px);
    padding: 15px 20px;
  }

  .el-menu {
    border: none;
  }

  body>.el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-col {
    overflow: hidden;
  }

  * {
    text-align: left;
  }

  /* .el-divider {
    margin: 6px 0px;
  } */

  .background {
    height: 100%;
    width: 100%;
  }

  .userBlock {
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #FFF;
  }

  .userBlock h2 {
    text-align: center;
  }

  .personal {
    height: 180px;
  }

  .headerItem {
    height: 60px;
    float: right;
    color: #545c64;
    font-size: 14px;
    cursor: pointer;
    overflow: hidden;
  }

  .noteWarning {
    color: #545c64;
    font-size: 14px;
    line-height: 14px;
    margin-left: 5px;
  }

  .headerTitle {
    float: left;
    color: #545c64;
  }

  .wallPaper {
    background-size: cover;
    background-repeat: no-repeat;
  }

  .el-avatar {
    text-align: center;
    font-size: 12px;
  }
</style>

<script>
  import {
    mapGetters
  } from 'vuex'
  import BillContainer from '../pages/BillContainer'
  export default {
    name: 'Container',
    components: {
      BillContainer
    },
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      };
      return {
        tableData: Array(20).fill(item),
        drawer: false,
        notes: "",
        user: {},
        wallPaper: {
          type: 'default'
        },
        userType:''
      }
    },
    computed: {
      getWallPaper() {
        if (this.wallPaper.type == 'picture') {
          return `background-image:url('${this.wallPaper.url}')`
        } else if (this.wallPaper.type == 'color') {
          return `background-color: ${this.wallPaper.url}`
        } else {
          return `background-color: #f3f3f3`
        }
      },
      userAccess() {
        if (this.user.userType === 0) {
          return false
        } else if (this.user.userType === 1) {
          return false
        } else if (this.user.userType === 2) {
          return true
        }
      },
      userName() {
        return this.$store.state.realName
      },
      ...mapGetters(['getColor'])
    },
    methods: {
      handleClose(done) {
        localStorage.setItem('notes', this.notes)
        this.$confirm('确认关闭？关闭后内容将自动保存')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      logout() {
        this.$confirm('确定退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user')
          window.location.href = "/login";
        })
      },
    },
    beforeMount() {

      this.$store.dispatch('userType', sessionStorage.getItem('user'))
      this.user = JSON.parse(sessionStorage.getItem('user'))
      sessionStorage.removeItem('user')
    },

    mounted() {
      if (JSON.parse(localStorage.getItem('wallPaper'))) {
        this.wallPaper = JSON.parse(localStorage.getItem('wallPaper'))
      } else {
        this.wallPaper = {
          type: 'default'
        }
      }


      this.$bus.$on('wallPaper', val => {
        this.wallPaper = val
        localStorage.setItem('wallPaper', JSON.stringify(val))
      })


      if (localStorage.getItem('notes')) {
        this.notes = localStorage.getItem('notes')
      } else {
        this.notes = ''
      }



      // this.$store.state.user = JSON.parse(sessionStorage.getItem('user'))
    },
    beforeDestroy() {
      this.$bus.$off('wallPaper')
      sessionStorage.setItem('user', JSON.stringify(this.$store.state))
    },
  };
</script>