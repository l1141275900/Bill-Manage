<template lang="">
    <div class="input-outer">
        <div class="demo-input-suffix">
            <el-row :gutter="10">
                <el-col :span="-1">
                    <p>用户名:</p>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入用户名" v-model="userName"></el-input>
                </el-col>
                <el-col :span="1">
                    <el-tooltip class="item" effect="dark" content="清空搜索框" placement="bottom">
                        <el-button type="danger" icon="el-icon-close" circle @click="toClear"></el-button>
                    </el-tooltip>
                </el-col>
                <el-col :span="1">
                    <el-tooltip class="item" effect="dark" content="开始搜索" placement="bottom">
                        <el-button type="primary" icon="el-icon-search" circle @click="toSearch"></el-button>
                    </el-tooltip>
                </el-col>
                <div class="upload">
                    <el-button type="primary" icon="el-icon-plus" @click="addNew" v-if="userAccess">添加</el-button>
                </div>
            </el-row>
            <AddNew v-if="userAccess"></AddNew>
        </div>
    </div>
</template>
<script>
    import AddNew from './AddNew'
    export default {
        name: 'ProviderSearch',
        data() {
            return {
                userName: ''
            }
        },
        components: {
            AddNew
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
        methods: {
            toSearch() {
                this.$bus.$emit('searchKey', this.userName)
            },
            toClear() {
                this.userName = ''
                this.$bus.$emit('searchKey')
            },
            addNew() {
                this.$bus.$emit('openAdd')
            }
        },
        mounted() {
            this.$bus.$on('changePageSize', val => {
                this.pageSize = val
            })
            this.$bus.$on('toSearch', () => {
                this.toSearch()
            })
        },
        beforeDestroy() {
            this.$bus.$off('changePageSize')
            this.$bus.$off('toSearch')
        },
    }
</script>
<style scoped>
    p {
        display: block;
        height: 40px;
        line-height: 40px;
    }

    .input-outer {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        height: 40px;
        padding: 10px;
        background-color: #FFF;
        margin-bottom: 10px;
    }

    .upload {
        float: right;
        margin-right: 20px;
    }
</style>