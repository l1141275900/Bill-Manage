<template lang="">
    <div class="outer">
        <div class="inner">
            <div class="avatarOuter">
                <el-avatar :size="'large'" :style="getColor"> {{realName}} </el-avatar>
            </div>
            <div class="tableOuter">
                <el-descriptions border>
                    <el-descriptions-item label="用户编号">{{user.userId}}</el-descriptions-item>
                    <el-descriptions-item label="用户名">{{user.userName}}</el-descriptions-item>
                    <el-descriptions-item label="真实姓名">{{user.realName}}</el-descriptions-item>
                    <el-descriptions-item label="性别">{{user.sex}}</el-descriptions-item>
                    <el-descriptions-item label="生日">{{user.birth}}</el-descriptions-item>
                    <el-descriptions-item label="用户类型">
                        <el-tag :type="userTypeColor" disable-transitions>
                            {{userTypeString}}</el-tag>
                    </el-descriptions-item>
                </el-descriptions>
                <div style="margin: 0 auto; width: 300px;">
                    <el-button @click="openTry">修改头像</el-button>
                    <el-button @click="toModify">修改信息</el-button>
                </div>
                <el-dialog :visible.sync="dialogVisible" width="30%">
                    <el-avatar :size="'large'" :style="tryColor"> {{realName}} </el-avatar>
                    <div class="colorGroup">
                        <div class="backColor">
                            <p>背景色:</p>
                            <el-color-picker v-model="backColor"></el-color-picker>
                        </div>
                        <div class="fontColor">
                            <p>字体色:</p>
                            <el-color-picker v-model="fontColor"></el-color-picker>
                        </div>
                    </div>
                    <span slot="footer">
                        <el-button @click="cancelTry">取 消</el-button>
                        <el-button type="primary" @click="accessColor">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
        <Modify></Modify>
    </div>
</template>
<script>
    import Modify from '../user/Modify'
    import {
        mapGetters
    } from 'vuex'
    export default {
        name: 'Personal',
        components:{Modify},
        data() {
            return {
                user: '',
                avatarColor: '',
                fontColor: '',
                dialogVisible: false,
                backColor: '',
                fontColor: ''
            }
        },
        computed: {
            realName() {
                return this.$store.state.realName
            },

            userTypeColor() {
                if (this.user.userType === 0) {
                    return 'warning'
                } else if (this.user.userType === 1) {
                    return 'danger'
                } else if (this.user.userType === 2) {
                    return ''
                }
            },
            userTypeString() {
                if (this.user.userType === 0) {
                    return '管理员'
                } else if (this.user.userType === 1) {
                    return '经理'
                } else if (this.user.userType === 2) {
                    return '普通用户'
                }
            },
            tryColor() {
                return `background-color:${this.backColor};color:${this.fontColor}`
            },
            ...mapGetters(['getColor'])
        },
        methods: {
            toModify(){
                this.$bus.$emit('toModify',this.$store.state.userId)
            },
            closeTry() {
                this.backColor = this.$store.state.backColor
                this.fontColor = this.$store.state.fontColor
                this.dialogVisible = false
            },
            openTry() {
                this.dialogVisible = true
            },
            changeAvatar() {
                this.dialogVisible = true
            },
            cancelTry() {
                this.backColor = this.user.backColor
                this.fontColor = this.user.fontColor
                this.closeTry()
            },
            accessColor() {
                this.$axios.post('/index/updateColor', JSON.stringify({
                    backColor: this.backColor,
                    fontColor: this.fontColor,
                    userId: this.user.userId
                }), {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                }).then(
                    response => {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        let colorObj = {
                            fontColor: this.fontColor,
                            backColor: this.backColor
                        }
                        this.$store.commit('AVATAR', colorObj)
                        this.closeTry()
                    },
                    error => {
                        
                        this.$message(error.message);
                    }
                )
            }
        },
        mounted() {
            this.user = this.$store.state
            this.backColor = this.$store.state.backColor
            this.fontColor = this.$store.state.fontColor
        },
    }
</script>
<style scoped>
    .outer {
        background-color: #FFF;
        height: calc(100vh - 140px);
    }

    .inner {
        margin: 20px;
    }

    .avatarOuter {
        width: 250px;
        margin: 0 auto;
    }

    .el-avatar {
        width: 150px;
        height: 150px;
        line-height: 150px;
        font-size: 40px;
        margin-top: -20px;
    }

    .el-descriptions {
        width: 70%;
        margin: 20px auto;
    }

    .colorGroup {
        position: relative;
    }

    .backColor,
    .fontColor {
        position: absolute;
    }

    .backColor {
        top: -150px;
        left: 200px;
    }

    .fontColor {
        top: -50px;
        left: 200px;
    }
</style>