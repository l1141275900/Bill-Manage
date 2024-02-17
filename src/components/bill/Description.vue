<template lang="">
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="60%">
        <el-descriptions border>
            <el-descriptions-item label="账单编号">{{row.billId}}</el-descriptions-item>
            <el-descriptions-item label="账单编码">{{row.billCode}}</el-descriptions-item>
            <el-descriptions-item label="商品名称">{{row.commodityName}}</el-descriptions-item>
            <el-descriptions-item label="商品数量">{{row.commodityAmount}} {{row.commodityUnit}}</el-descriptions-item>
            <el-descriptions-item label="总金额">{{row.amount}}</el-descriptions-item>
            <el-descriptions-item label="供应商">{{row.providerName}}</el-descriptions-item>
            <el-descriptions-item label="是否付款">
                <el-tag :type="row.payment === 0 ? 'warning' : 'success'" disable-transitions>
                    {{row.payment == 1 ? '已付款' : '未付款'}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">{{row.createTime}}</el-descriptions-item>
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
        props: ['userType'],
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
            closeShow() {
                this.dialogVisible = false
            },
            openShow() {
                this.dialogVisible = true
            },
            toModify() {
                this.$bus.$emit('toModify', this.id)
                this.closeShow()
            },
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