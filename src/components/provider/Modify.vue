<template lang="">
    <el-dialog title="修改" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
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
                <el-button @click="closeModify">取消</el-button>
            </el-form-item>
            </el-alert>
        </el-form>
    </el-dialog>
</template>
<script>
    export default {
        name: 'Modify',
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
            onSubmit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.loading = true

                        this.$axios.post('/provider/updateProvider', JSON.stringify(this.form[0]), {
                            headers: {
                                "Content-Type": "application/json;charset=utf-8"
                            }
                        }).then(
                            response => {
                                this.loading = false
                                if (response.data == 1) {
                                    this.$message({
                                        message: '编辑成功',
                                        type: 'success'
                                    });
                                    this.closeModify()
                                    this.$bus.$emit('toSearch')
                                    this.form = [{
                                        providerCode: '',
                                        providerName: '',
                                        contacts: '',
                                        tel: '',
                                        fax: '',
                                        address: '',
                                        summary: ''
                                    }]
                                } else {
                                    this.$message({
                                        message: '编辑失败',
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
            closeModify() {
                this.dialogVisible = false
            },
            openModify() {
                this.dialogVisible = true

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            emitServer(providerId) {
                this.loading = true

                this.$axios.get('/provider/detailProvider', {
                    params: {
                        providerId: providerId
                    }
                }).then(
                    response => {
                        this.loading = false
                        this.form = response.data
                    },
                    error => {
                        this.loading = false
                    }
                )
            },
        },
        mounted() {
            this.$bus.$on('toModify', providerId => {
                this.openModify()
                this.emitServer(providerId)
            })
        },
        beforeDestroy() {
            this.$bus.$off('toModify')
        },
    }
</script>
<style lang="">

</style>