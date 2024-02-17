<template lang="">
    <el-dialog title="添加" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
        <el-form ref="form[0]" :model="form[0]" label-width="80px" v-loading="loading" :rules="rules">
            <el-form-item label="账单编码" prop="billCode">
                <el-input v-model="form[0].billCode"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="commodityName">
                <el-input v-model="form[0].commodityName"></el-input>
            </el-form-item>
            <el-form-item label="商品单位" prop="commodityUnit">
                <el-input v-model="form[0].commodityUnit"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="commodityAmount">
                <el-input-number v-model="form[0].commodityAmount" :min="0" label="商品数量"></el-input-number>
            </el-form-item>
            <el-form-item label="总金额" prop="amount">
                <el-input-number v-model="form[0].amount" :min="0" label="总金额"></el-input-number>
            </el-form-item>
            <el-form-item label="供应商" prop="providerId">
                <el-select v-model="form[0].providerId" placeholder="请选择" @focus="getProvider">
                    <el-option v-for="item in options" :key="item.providerId" :value="item.providerId"
                        :label="item.providerName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否付款">
                <el-radio v-model="form[0].payment" :label="1">已付款</el-radio>
                <el-radio v-model="form[0].payment" :label="0">未付款</el-radio>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form[0]')">提交</el-button>
                <el-button @click="closeAdd">取消</el-button>
            </el-form-item>
            </el-alert>
        </el-form>
    </el-dialog>
</template>
<script>
    export default {
        name: 'AddNew',
        data() {
            return {
                dialogVisible: false,
                form: [{
                    billCode: '',
                    commodityName: '',
                    commodityUnit: '',
                    commodityAmount: '',
                    amount: '',
                    providerId: '',
                    payment: 0
                }],
                loading: false,
                options: [{}],
                rules: {
                    billCode: [{
                        required: true,
                        message: '请输入账单编码',
                        trigger: 'blur'
                    }],
                    commodityName: [{
                        required: true,
                        message: '请输入商品名称',
                        trigger: 'blur'
                    }],
                    commodityUnit: [{
                        required: true,
                        message: '请输入商品单位',
                        trigger: 'blur'
                    }],
                    commodityAmount: [{
                        type: 'number',
                        required: true,
                        message: '请输入商品数量',
                        trigger: 'blur'
                    }],
                    amount: [{
                        required: true,
                        message: '请输入总金额',
                        trigger: 'blur'
                    }],
                    providerId: [{
                        required: true,
                        message: '请选择供应商',
                        trigger: 'blur'
                    }],
                    payment: [{
                        required: true,
                        message: '请选择支付状态',
                        trigger: 'blur'
                    }]
                },
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.$axios.post('/bill/insertBill', JSON.stringify(this.form[0]), {
                            headers: {
                                "Content-Type": "application/json;charset=utf-8"
                            }
                        }).then(
                            response => {
                                this.loading = false
                                if (response.data == 1) {
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    this.$bus.$emit('submitSuccess')
                                    this.form = [{
                                        billCode: '',
                                        commodityName: '',
                                        commodityUnit: '',
                                        commodityAmount: '',
                                        amount: '',
                                        providerId: '',
                                        payment: 0
                                    }]
                                    this.closeAdd()
                                } else {
                                    this.$message({
                                        message: '添加失败',
                                        type: 'error'
                                    });
                                }
                            },
                            error => {
                                this.loading = false
                                this.$message(error.message);
                            }
                        )
                    } else {
                        return false;
                    }
                });

            },
            closeAdd() {
                this.dialogVisible = false
            },
            openAdd() {
                this.dialogVisible = true

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            getProvider() {
                this.$axios.get('/provider/queryProvider').then(
                    response => {
                        this.options = response.data
                    },
                    error => {
                        console.log(error.message);
                    }
                )
            },
            submitSuccess() {
                this.closeAdd()
            }
        },
        mounted() {
            this.$bus.$on('openAdd', () => {
                this.dialogVisible = true
            })
        },
        beforeDestroy() {
            this.$bus.$off('openAdd')
        },
    }
</script>