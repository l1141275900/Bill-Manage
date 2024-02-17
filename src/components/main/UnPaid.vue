<template lang="">
    <el-card shadow="hover">
        <h1> 近五次未付款账单</h1>
        <template>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="billCode" label="账单编码">
                </el-table-column>
                <el-table-column prop="commodityName" label="商品名称">
                </el-table-column>
                <el-table-column prop="providerName" label="供应商">
                </el-table-column>
                <el-table-column prop="amount" label="总金额" width="100">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="115">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="paid(scope.row)" v-if="userAccess">标记付款</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <Description></Description>
    </el-card>
</template>
<script>
    import Description from '../bill/Description'
    export default {
        name: 'UnPaid',
        components: {
            Description
        },
        data() {
            return {
                tableData: [{
                    billCode:'06',
                    commodityName:'无敌小火把',
                    providerName:'史蒂夫的小方块有限公司',
                    amount:100
                },
                {
                    billCode:'17',
                    commodityName:'AK47',
                    providerName:'真人CSGO俱乐部',
                    amount:2000
                }],
                userType : '' 
            }
        },
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
            handleClick(row) {
                this.$bus.$emit('toShow', row)
            },
            paid(row) {
                row.payment = 1
                this.$axios.post('/bill/updateBill', JSON.stringify(row), {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                }).then(
                    response => {
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].billId == row.billId) {
                                this.tableData.splice(i, 1)
                                break
                            }
                        }
                        this.$notify({
                            title: '标记成功',
                            message: `已成功将编号为${row.billCode}的账单标记为已付款`,
                            type: 'success'
                        });
                        this.emitServer()
                    },
                    error => {
                        this.$notify.error({
                            title: '标记失败',
                            message: '未能将该账单标记为已付款'
                        });
                    }
                )
            },
            emitServer() {
                this.$axios.get('/index/unpaid').then(
                    response => {
                        this.tableData = response.data
                    },
                    error => {
                        console.log(error.message);
                    }
                )
            }

        },
        mounted() {
            this.emitServer()
            this.userType = this.$store.state.userType
        },
    }
</script>
<style scoped>
    .el-card {
        overflow: auto;
        height: 407px;
    }
</style>