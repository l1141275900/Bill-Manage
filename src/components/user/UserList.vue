<template lang="">
    <div>
        <template>
            <Description :userType="userType"></Description>
            <ToModify ref="toModify"></ToModify>

            <!-- <button @click="test">测试</button> -->

            <el-table ref="filterTable" :data="tableData" style="width: 100%">
                <el-table-column prop="userName" label="用户名">
                </el-table-column>

                <el-table-column prop="realName" label="真实姓名">
                </el-table-column>

                <el-table-column prop="sex" label="性别" width="100">
                </el-table-column>

                <el-table-column prop="birth" label="出生日期">
                </el-table-column>

                <el-table-column prop="userType" label="用户类型"
                    :filters="[{ text: '管理员', value: 0 }, { text: '经理', value: 1 },{ text: '普通用户', value: 2 }]"
                    :filter-method="filterTag" filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag :type="getUserType(scope.row.userType)" effect="plain" disable-transitions>
                            {{getUserTypeName(scope.row.userType)}}</el-tag>
                    </template>
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
        name: 'UserList',
        components: {
            Description,
            ToModify
        },
        data() {
            return {
                pageSize: 7,
                pageNum: 1,
                tableData: [{
                    userId: '123',
                    userName: '123',
                    realName: '123',
                    sex: '',
                    birth: '',
                    userType: '',
                    pass:'123'
                },],
                detail: {}
            }
        },
        props: ['userType'],
        computed: {
            userAccess() {
                if (this.userType === 0) {
                    return true
                } else if (this.userType === 1) {
                    return false
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
            getUserType(type) {
                if (type === 0) {
                    return 'danger'
                } else if (type === 1) {
                    return 'warning'
                } else if (type === 2) {
                    return ''
                }
            },
            getUserTypeName(type) {
                if (type === 0) {
                    return '管理员'
                } else if (type === 1) {
                    return '经理'
                } else if (type === 2) {
                    return '普通用户'
                }
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            filterTag(value, row) {
                return row.userType === value;
            },
            toShow(row) {
                this.$bus.$emit('toShow', row)
            },
            modify(row) {
                this.$bus.$emit('toModify', row.userId)
            },
            emitServer(page, size) {
                if (size === -1) {
                    this.pageNum = page
                } else if (page === -1) {
                    this.pageSize = size
                }
                this.$axios.get(`/user/userList/${this.pageNum}`, {
                    params: {
                        pageSize: this.pageSize,
                        userName: this.searchKey
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
                    this.$axios.post('/user/deleteUser', JSON.stringify({
                        userId: row.userId
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
        },
        beforeDestroy() {
            this.$bus.$off('submitSuccess')
            this.$bus.$off('changePage')
            this.$bus.$off('changeSize')
            this.$bus.$off('searchKey')
        },
    }
</script>
<style scoped>
    div{
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