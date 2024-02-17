<template lang="">
    <el-dialog title="修改" :visible.sync="dialogVisible" width="28%" :before-close="handleClose">
        <el-form ref="form[0]" :model="form[0]" label-width="100px" v-loading="loading" :rules="rules">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="form[0].userName"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realName">
                <el-input v-model="form[0].realName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="form[0].password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="form[0].checkPass" autocomplete="off" show-password
                    :disabled="changePassword" placeholder="若有更改密码需求，则需要填写该项"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio v-model="form[0].sex" label="男">男</el-radio>
                <el-radio v-model="form[0].sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="出生日期" prop="birth">
                <el-date-picker v-model="form[0].birth" type="date" placeholder="单击上方年月以快速选择"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="用户类别" prop="userType">
                <el-radio v-model="form[0].userType" :label="0">管理员</el-radio>
                <el-radio v-model="form[0].userType" :label="1">经理</el-radio>
                <el-radio v-model="form[0].userType" :label="2">普通用户</el-radio>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form[0]')">提交</el-button>
                <el-button @click="closeModify">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
    export default {
        name: 'Modify',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form[0].checkPass !== '') {
                        this.$refs['form[0]'].validateField('checkPass');           //
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if(!(this.changePassword)){
                    if (value === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (value !== this.form[0].password) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                }else{
                    callback();
                }
            };
            return {
                changePassword: true,
                dialogVisible: false,
                form: [{
                    userId: '',
                    userName: '',
                    realName: '',
                    sex: '',
                    birth: '',
                    userType: '',
                    password: '',
                    checkPass: ''
                }, ],
                pass:'',
                loading: false,
                rules: {
                    userName: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    realName: [{
                        required: true,
                        message: '请输入用户真实姓名',
                        trigger: 'blur'
                    }],
                    sex: [{
                        required: true,
                        message: '请选择性别',
                        trigger: 'blur'
                    }],
                    birth: [{
                        required: true,
                        message: '请输入日期',
                        trigger: 'blur'
                    }],
                    pass: [{
                        required: true,
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        required: true,
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                    userType: [{
                        required: true,
                        message: '请选择用户类别',
                        trigger: 'blur'
                    }]

                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                }
            }
        },
        watch: {
            form: {
                deep: true,
                handler: function (old, value) {
                    if (this.form[0].password != this.pass) {
                        this.changePassword = false
                    } else if (this.form[0].password == this.pass) {
                        this.changePassword = true
                    }
                },
            }
        },
        computed: {
            userAccess() {
                let userType = this.$store.state.userType
                if (userType == 0) {
                    return false
                } else if (userType == 1) {
                    return true
                } else if (userType == 2) {
                    return true
                }
            }
        },
        methods: {
            onSubmit(form) {
                this.$refs[form].validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        this.loading = true
                        this.$axios.post('/user/updateUser', JSON.stringify(this.form[0]), {
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
                                        userName: '',
                                        realName: '',
                                        sex: '',
                                        birth: '',
                                        userType: '',
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
            emitServer(userId) {
                this.loading = true

                this.$axios.get('/user/detailUser', {
                    params: {
                        userId: userId
                    }
                }).then(
                    response => {
                        this.loading = false
                        this.form = response.data
                        this.pass = response.data[0].password

                        this.$set(this.form[0],'checkPass','')
                    },
                    error => {
                        this.loading = false

                    }
                )
            },
        },
        mounted() {
            this.$bus.$on('toModify', userId => {
                this.openModify()
                this.emitServer(userId)
            })
        },
        beforeDestroy() {
            this.$bus.$off('toModify')
        },
    }
</script>
<style lang="">

</style>