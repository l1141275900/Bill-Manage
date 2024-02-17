<template lang="">
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="60%">
        <el-descriptions border>
            <el-descriptions-item label="用户编号">{{row.userId}}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{row.userName}}</el-descriptions-item>
            <el-descriptions-item label="真实姓名">{{row.realName}}</el-descriptions-item>
            <el-descriptions-item label="性别">{{row.sex}}</el-descriptions-item>
            <el-descriptions-item label="生日">{{row.birth}}</el-descriptions-item>
            <el-descriptions-item label="密码" v-if="userAccess">{{row.password}}</el-descriptions-item>
            <el-descriptions-item label="用户类型">
                <el-tag :type="userTypeColor" disable-transitions>
                    {{userTypeString}}</el-tag>
            </el-descriptions-item>
        </el-descriptions>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeShow">取 消</el-button>
            <el-button type="primary" @click="toModify" v-if="userAccess">编 辑</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        name: 'Description',
        data() {
            return {
                dialogVisible: false,
                row: {}
            };
        },
        props:['userType'],
        computed: {
            userAccess() {
                if (this.userType === 0) {
                    return true
                } else if (this.userType === 1) {
                    return false
                } else if (this.userType === 2) {
                    return false
                }
            },
            userTypeColor() {
                if (this.row.userType === 0) {
                    return 'warning'
                } else if (this.row.userType === 1) {
                    return 'danger'
                } else if (this.row.userType === 2) {
                    return ''
                }
            },
            userTypeString() {
                if (this.row.userType === 0) {
                    return '管理员'
                } else if (this.row.userType === 1) {
                    return '经理'
                } else if (this.row.userType === 2) {
                    return '普通用户'
                }
            }
        },
        methods: {
            closeShow() {
                this.dialogVisible = false
            },
            openShow() {
                this.dialogVisible = true
            },
            toModify() {
                this.$bus.$emit('toModify', this.row.userId)
                this.closeShow()
            }
        },
        mounted() {
            this.$bus.$on('toShow', row => {
                this.row = row
                this.openShow()
            })
        },
        beforeDestroy() {
            this.$bus.$off('toShow')
        },
    }
</script>
<style lang="">

</style>