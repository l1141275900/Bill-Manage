<template lang="">
    <router-link class="cardOuter" to="/personal">
        <el-card shadow="hover" :class="userType">
            <el-avatar :size="80" :style="getColor"> {{userName}} </el-avatar>
            <p class="good fontColor">{{goodText}} {{userName}} </p>
            <p class="userType fontColor">尊敬的{{userTypeString}}, 欢迎使用Bill账单管理系统!</p>
            <p class="userInfo fontColor">用户信息>>></p>
        </el-card>
    </router-link>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        name: 'UserCard',
        data() {
            return {
                user: ''
            }
        },
        computed: {
            userName() {
                return this.$store.state.realName
            },
            goodText() {
                var date = new Date();
                var hour = date.getHours();
                if (hour >= 6 && hour < 12) {
                    return '上午好!'
                } else if (hour >= 12 && hour < 18) {
                    return '下午好!'
                } else if (hour >= 18 && hour < 23 || hour >= 0 && hour < 6) {
                    return '晚上好!'
                }
            },
            userType() {
                if (this.user.userType === 0) {
                    return 'admin'
                } else if (this.user.userType === 1) {
                    return 'manager'
                } else if (this.user.userType === 2) {
                    return 'user'
                }
            },
            userTypeString() {
                if (this.user.userType === 0) {
                    return '管理员'
                } else if (this.user.userType === 1) {
                    return '经理'
                } else if (this.user.userType === 2) {
                    return '用户'
                }
            },
            ...mapGetters(['getColor'])
        },
        mounted() {
            this.user = this.$store.state
        },
    }
</script>
<style scoped>
    .el-avatar {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin: 20px 10px 20px 20px;
    }

    .cardOuter {
        position: relative;
        cursor: pointer;
    }

    .good {
        position: absolute;
        font-size: 22px;
        top: 30px;
        left: 130px;
    }

    .userType {
        position: absolute;
        font-size: 14px;
        top: 70px;
        left: 130px;
    }

    .userInfo {
        position: absolute;
        font-size: 14px;
        top: 80%;
        left: 70%;
    }

    .fontColor {
        color: #ffffff;
    }

    .admin {
        background-color: #E6A23C;
    }

    .manager {
        background-color: #F56C6C;
    }

    .user {
        background-color: #409EFF;
    }
</style>