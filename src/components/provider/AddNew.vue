<template lang="">
    <el-dialog title="添加" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
        <el-form ref="form[0]" :model="form[0]" label-width="100px" v-loading="loading" :rules="rules">
            <el-form-item label="供应商编码" prop="providerCode">
                <el-input v-model="form[0].providerCode"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" prop="providerName">
                <el-input v-model="form[0].providerName"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contacts">
                <el-input v-model="form[0].contacts"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="tel">
                <el-input v-model.number="form[0].tel"></el-input>
            </el-form-item>
            <el-form-item label="联系地址" prop="address">
                <el-input v-model="form[0].address"></el-input>
            </el-form-item>
            <el-form-item label="传真" prop="fax">
                <el-input v-model.number="form[0].fax"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" autosize v-model="form[0].summary">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form[0]')">提交</el-button>
                <el-button @click="closeAdd">取消</el-button>
            </el-form-item>
            <!-- </el-alert> -->
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
                    providerCode: '',
                    providerName: '',
                    contacts: '',
                    tel: '',
                    fax: '',
                    address: '',
                    summary: ''
                }],
                loading: false,
                rules: {
                    providerCode: [{
                        required: true,
                        message: '请输入供应商编码',
                        trigger: 'blur'
                    }],
                    providerName: [{
                        required: true,
                        message: '请输入供应商名称',
                        trigger: 'blur'
                    }],
                    contacts: [{
                        required: true,
                        message: '请输入联系人',
                        trigger: 'blur'
                    }],
                    tel: [{
                        type: 'number',
                        required: true,
                        message: '请输入正确的联系方式',
                        trigger: 'blur'
                    }],
                },
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.$axios.post('/provider/insertProvider', JSON.stringify(this.form[0]), {
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
                                        providerCode: '',
                                        providerName: '',
                                        contacts: '',
                                        tel: '',
                                        fax: '',
                                        address: '',
                                        summary: ''
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