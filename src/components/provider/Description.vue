<template lang="">
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="60%">
        <el-descriptions border>
            <el-descriptions-item label="供应商编号">{{row.providerId}}</el-descriptions-item>
            <el-descriptions-item label="供应商编码">{{row.providerCode}}</el-descriptions-item>
            <el-descriptions-item label="供应商名称">{{row.providerName}}</el-descriptions-item>
            <el-descriptions-item label="联系人">{{row.contacts}}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{row.tel}}</el-descriptions-item>
            <el-descriptions-item label="传真">{{row.fax}}</el-descriptions-item>
            <el-descriptions-item label="联系地址">{{row.address}}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{row.createTime}}</el-descriptions-item>
            <el-descriptions-item label="描述">{{row.summary}}</el-descriptions-item>
        </el-descriptions>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeShow">取 消</el-button>
            <el-button type="primary" @click="toModify" v-if="userAccess">编 辑</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        name:'Description',
        data() {
            return {
                dialogVisible: false,
                row:{}
            };
        },
        props:['userType'],
        computed: {
            userAccess() {
                if (this.userType === 0) {
                    return true
                } else if (this.userType === 1) {
                    return true
                } else if (this.userType === 2) {
                    return false
                }
            }
        },
        methods: {
            closeShow(){
                this.dialogVisible = false
            },
            openShow(){
                this.dialogVisible = true
            },
            toModify(){
                this.$bus.$emit('toModify',this.row.providerId)
                this.closeShow()
            }
        },
        mounted() {
            this.$bus.$on('toShow', row => {
                this.openShow()
                this.row = row
            })
        },
        beforeDestroy() {
            this.$bus.$off('toShow')
        },
    }
</script>
<style lang="">

</style>