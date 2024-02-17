<template lang="">
    <div class="input-outer">
        <div class="demo-input-suffix">
            <el-row :gutter="10">
                <el-col :span="-1">
                    <p>商品名称:</p>
                </el-col>
                <el-col :span="4">
                    <el-input placeholder="请输入商品名" v-model="goodName"></el-input>
                </el-col>
                <el-col :span="-1">
                    <p>供应商:</p>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="providerName" placeholder="请选择" @focus="getProvider">
                        <el-option v-loading="loading" :value="''" disabled v-show="loading"></el-option>
                        <el-option v-for="item in providers" :key="item.providerId" :label="item.providerName"
                            :value="item.providerName">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="-1">
                    <p>支付状态:</p>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="payment" placeholder="请选择">
                        <el-option v-for="item in payments" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
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
                <span class="actionAll" v-if="userAccess">
                    批量删除:<el-switch v-model="action" active-color="#13ce66"></el-switch>
                    <el-tooltip class="item" effect="dark" content="确认删除" placement="bottom" v-if="action">
                        <el-button class="delete" type="danger" icon="el-icon-delete" circle @click="confirmDelete"></el-button>
                    </el-tooltip>
                </span>

                <div class="upload">
                    <el-button type="primary" icon="el-icon-plus" @click="addNew" v-if="userAccess">添加</el-button>
                </div>
            </el-row>
        </div>
        <AddNew v-if="userAccess"></AddNew>
    </div>
</template>
<script>
    import AddNew from './AddNew'
    export default {
        name: 'billSearch',
        components: {
            AddNew
        },
        props: ['userType'],
        data() {
            return {
                goodName: '',
                providerName: '',
                providers: [],
                payment: '',
                payments: [{
                        value: 1,
                        label: '已付款'
                    },
                    {
                        value: 0,
                        label: '未付款'
                    }
                ],
                pageSize: 7,
                loading: false,
                action:false
            }
        },
        watch:{
            action(){
                this.$bus.$emit('actionAll',this.action)
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
            getProvider() {
                this.loading = true
                this.$axios.get('/provider/queryProvider').then(
                    response => {
                        this.loading = false
                        this.providers = response.data
                    },
                    error => {
                        this.loading = false
                        console.log(error.message);
                    }
                )
            },
            toSearch() {
                this.$bus.$emit('searchKey', {
                    providerName: this.providerName,
                    commodityName: this.goodName,
                    payment: this.payment,
                })
            },
            toClear() {
                this.goodName = ''
                this.providerName = ''
                this.payment = ''
                this.$bus.$emit('searchKey', {})
            },
            addNew() {
                this.$bus.$emit('openAdd')
            },
            confirmDelete(){
                this.$bus.$emit('confirmDelete')
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
        height: 40px;
        padding: 10px;
        background-color: #FFF;
        margin-bottom: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .upload {
        float: right;
        margin-right: 20px;
    }
    .actionAll{
        margin-top: 10px;
        line-height: 40px;
    }
    .delete{
        margin-left: 5px;
    }
</style>