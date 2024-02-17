<template lang="">
    <el-dialog :title="`与供应商${providerName}有关的账单列表`" :visible.sync="dialogVisible" width="70%"
        :before-close="handleClose">
        <el-table :data="delFailBill" style="width: 100%">
            <el-table-column prop="billCode" label="账单编码">
            </el-table-column>

            <el-table-column prop="commodityName" label="商品名称">
            </el-table-column>

            <el-table-column prop="providerName" label="供应商">
            </el-table-column>

            <el-table-column prop="amount" label="总金额" width="100">
            </el-table-column>

            <el-table-column prop="payment" label="付款状态" width="100"
                :filters="[{ text: '已付款', value: 1 }, { text: '未付款', value: 0 }]" :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.payment === 0 ? 'warning' : 'success'" disable-transitions>
                        {{scope.row.payment == 1 ? '已付款' : '未付款'}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="createTime" label="创建时间" sortable width="180" column-key="createTime">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="del(scope.row)" type="text" size="small">
                        <p class="danger">删除</p>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>
<script>
    export default {
        name: 'DelFail',
        data() {
            return {
                dialogVisible: false,
                delFailBill: [
                    /* {
                                        billId:1,
                                        billCode: '001',
                                        commodityName: 'commodityName',
                                        providerName: 'providerName',
                                        amount: 'amount',
                                        payment: 1,
                                        createTime: '001'
                                    } */
                ],
                providerName: '',
                row:''
            }
        },
        watch: {
            delFailBill() {
                if (this.delFailBill.length == 0) {
                    this.$confirm('所有关联账单均已删除，是否尝试重新删除供应商?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$bus.$emit('retryDel',this.row)
                        this.dialogVisible = false
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            filterTag(value, row) {
                return row.payment === value;
            },
            del(row) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/bill/deleteBill', JSON.stringify({
                        billId: row.billId
                    }), {
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        }
                    }).then(
                        response => {
                            if (response.data == 1) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                let id1 = this.delFailBill.findIndex(item => {
                                    if (item.billId == row.billId) {
                                        return true
                                    }
                                })
                                this.delFailBill.splice(id1, 1)
                            } else {
                                this.$message({
                                    message: '删除失败',
                                    type: 'error'
                                });
                            }
                        },
                        error => {
                            this.$message(error.message);
                        }
                    )
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }
        },
        mounted() {
            this.$bus.$on('DelFailBillId', obj => {
                this.dialogVisible = true
                this.delFailBill = obj.detailProvider
                this.providerName = obj.providerName
                this.row = obj.row
            })
        },
        beforeDestroy() {
            this.$bus.$off('DelFailBillId')
        },
    }
</script>
<style scoped>
    .danger {
        color: #F56C6C;
        font-size: 12px;
        margin: 0px;
    }
</style>