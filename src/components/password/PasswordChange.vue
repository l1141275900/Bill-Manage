<template lang="">
    <div class="outer">
        <div class="inner">
            <el-form :model="passwordForm" status-icon :rules="rules" ref="passwordForm" label-width="100px"
                label-position="top">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input v-model="passwordForm.oldPassword" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="passwordForm.pass" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="passwordForm.checkPass" autocomplete="off" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('passwordForm')">提交</el-button>
                    <el-button @click="resetForm('passwordForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'PasswordChange',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.passwordForm.checkPass !== '') {
                        this.$refs.passwordForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                passwordForm: {
                    oldPassword: '',
                    pass: '',
                    checkPass: '',
                    userId: ''
                },
                rules: {
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/user/updatePsw', JSON.stringify({
                            oldPassword: this.passwordForm.oldPassword,
                            pass: this.passwordForm.checkPass,
                            userId:this.passwordForm.userId
                        }), {
                            headers: {
                                "Content-Type": "application/json;charset=utf-8"
                            }
                        }).then(
                            response => {
                                if (response.data === 1) {
                                    this.$message({
                                        message: '修改密码成功',
                                        type: 'success'
                                    });
                                    setTimeout(() => {
                                        window.location.href = "/login";
                                        sessionStorage.removeItem('user')
                                    }, 1000);
                                } else if (response.data === 0) {
                                    this.$message({
                                        message: '修改失败，请检查旧密码是否正确',
                                        type: 'danger'
                                    });
                                }
                            },
                            error => {
                                this.$message({
                                    message: error.message
                                });
                            }
                        )
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            const userId = this.$store.state.userId
            if (typeof(userId) == 'number') {
                this.passwordForm.userId = userId
            } else {
                alert('user未获取')
            }
        },
    }
</script>
<style scoped>
    .outer {
        background-color: #FFF;
        padding: 30px;
    }

    .inner {
        margin: 0 auto;
        width: 500px;
    }
</style>