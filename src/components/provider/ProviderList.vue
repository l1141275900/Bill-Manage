<template lang="">
    <div>
        <template>
            <Description :userType="userType"></Description>
            <ToModify ref="toModify"></ToModify>
            <DelFail></DelFail>

            <!-- <button @click="test">测试</button> -->

            <el-table ref="filterTable" :data="tableData" style="width: 100%">
                <el-table-column prop="providerCode" label="供应商编码">
                </el-table-column>

                <el-table-column prop="providerName" label="供应商名称">
                </el-table-column>

                <el-table-column prop="contacts" label="联系人" width="100">
                </el-table-column>

                <el-table-column prop="tel" label="联系电话">
                </el-table-column>

                <el-table-column prop="fax" label="传真">
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
    import DelFail from './DelFail'
    export default {
        name: 'providerList',
        components: {
            Description,
            ToModify,
            DelFail
        },
        data() {
            return {
                pageSize: 7,
                pageNum: 1,
                tableData: [],
                detail: {}
            }
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
                this.$bus.$emit('toModify', row.providerId)
            },
            emitServer(page, size) {
                if (size === -1) {
                    this.pageNum = page
                } else if (page === -1) {
                    this.pageSize = size
                }
                this.$axios.get(`/provider/providerList/${this.pageNum}`, {
                    params: {
                        pageSize: this.pageSize,
                        providerName: this.searchKey
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
                    this.$axios.post('/provider/deleteProvider', JSON.stringify({
                        providerId: row.providerId
                    }), {
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        }
                    }).then(
                        response => {
                            if (response.data.flag == 1) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.$bus.$emit('toSearch')
                            } else if (response.data.flag == 0) {
                                this.$message({
                                    message: '删除失败',
                                    type: 'error'
                                });
                            } else if (response.data.flag == 3) {
                                this.$message({
                                    message: '删除失败，请先删除与此供应商相关联的账单',
                                    type: 'warning'
                                });
                                let delFail = {
                                    detailProvider: response.data.detailProvider,
                                    providerName : row.providerName,
                                    row : row
                                }
                                this.$bus.$emit('DelFailBillId', delFail)

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
            this.$bus.$on('changeSize', val => {
                this.emitServer(-1, val)
            })
            this.$bus.$on('changePage', val => {
                this.emitServer(val, -1)
            })
            this.$bus.$on('submitSuccess', () => {
                this.emitServer()
            })
            this.$bus.$on('searchKey', obj => {
                this.searchKey = obj
                this.emitServer()
            })
            this.$bus.$on('retryDel', obj => {
                this.del(obj)
            })
        },
        beforeDestroy() {
            this.$bus.$off('submitSuccess')
            this.$bus.$off('changePage')
            this.$bus.$off('changeSize')
            this.$bus.$off('searchKey')
            this.$bus.$off('retryDel')
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