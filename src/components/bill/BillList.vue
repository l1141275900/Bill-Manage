<template>
    <div>
        <template>
            <Description :userType="userType"></Description>
            <ToModify ref="toModify"></ToModify>

            <!-- <button @click="test">测试</button> -->

            <el-table ref="filterTable" :data="tableData" :key="tableData.billId" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column prop="delete" label="批量删除" width="50" v-if="actionAll" type="selection">
                </el-table-column>>

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

                <el-table-column fixed="right" label="操作" width="130">
                    <template slot-scope="scope">
                        <el-button @click="toShow(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="modify(scope.row)" type="text" size="small" v-if="userAccess">编辑</el-button>
                        <el-button @click="del(scope.row)" type="text" size="small" v-if="userAccess">
                            <p class="danger">删除</p>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
    import Description from './Description'
    import ToModify from './Modify'
    export default {
        name: 'BillList',
        components: {
            Description,
            ToModify
        },
        props: ['userType'],
        data() {
            return {
                pageSize: 7,
                pageNum: 1,
                detail: {},
                // 看起来没什么用的变量↓
                showDetail: false,
                provider: {},
                // 最后在删试试
                searchKey: {},
                actionAll: false,
                deleteObj: {},


                tableData: []
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
        watch: {
            tableData: {
                deep: true,
                handler: function () {
                    if(this.tableData.length == 0){
                        this.$bus.$emit('emptyList')
                    }
                }
            }
        },
        methods: {
            handleSelectionChange(val) {

                this.deleteObj = val
            },
            confirmDelete() {
                let deleteId = []
                let deleteObj = this.deleteObj
                for (let i = 0; i < deleteObj.length; i++) {
                    deleteId.push(deleteObj[i].billId)
                }
                this.$axios.post('/index/batchDelete', JSON.stringify({
                    'userId': deleteId
                }), {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                }).then(
                    response => {
                        this.$message({
                            message: '批量删除成功',
                            type: 'success'
                        });
                        this.emitServer()
                    },
                    error => {
                        this.$message(error.message);
                    }
                )
            },
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.payment === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            toShow(row) {
                this.$bus.$emit('toShow', row)
            },
            modify(row) {
                // this.$refs.toModify.openModify(row)
                this.$bus.$emit('toModify', row.billId)
            },
            emitServer(page, size) {
                if (size === -1) {
                    this.pageNum = page
                } else if (page === -1) {
                    this.pageSize = size
                }
                this.$axios.get(`/bill/billList/${this.pageNum}`, {
                    params: {
                        pageSize: this.pageSize,
                        ...this.searchKey
                    }
                }).then(
                    response => {
                        this.tableData = response.data.list
                        this.$bus.$emit('total', response.data.total)
                    },
                    error => {
                        console.log(error.message);
                    }
                )
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
                                this.$bus.$emit('toSearch')
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
            this.emitServer()


            this.$bus.$on('submitSuccess', () => {
                this.emitServer()
            })

            this.$bus.$on('changePage', val => {
                this.emitServer(val, -1)
            })
            this.$bus.$on('changeSize', val => {
                this.emitServer(-1, val)
            })
            this.$bus.$on('searchKey', obj => {
                this.searchKey = obj
                this.emitServer()
            })
            this.$bus.$on('actionAll', val => {
                this.actionAll = val
            })
            this.$bus.$on('confirmDelete', () => {
                this.confirmDelete()
            })
        },
        beforeDestroy() {
            this.$bus.$off('submitSuccess')
            this.$bus.$off('changePage')
            this.$bus.$off('changeSize')
            this.$bus.$off('searchKey')
            this.$bus.$off('actionAll')
        },
    }
</script>
<style scoped>
    div {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    p {
        font-size: 18px;
        height: 20px;
        line-height: 20px;
        margin: 10px 0px;
    }

    .danger {
        color: #F56C6C;
        font-size: 12px;
        margin: 0px;
    }
</style>