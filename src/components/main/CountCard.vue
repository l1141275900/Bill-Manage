<template lang="">
    <div>
        <el-card shadow="hover">
            <el-row>
                <el-col :span="8">
                    <h1>账单数</h1>
                    <p>{{billNum}}</p>
                </el-col>
                <el-col :span="8">
                    <h1>供应商数</h1>
                    <p>{{providerNum}}</p>
                </el-col>
                <el-col :span="8">
                    <h1>用户数</h1>
                    <p>{{userNum}}</p>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'CountCard',
        data() {
            return {
                billNum:9,
                providerNum:6,
                userNum:23,
            }
        },
        mounted() {
            this.$axios.get('/index/count').then(
                response => {
                    this.billNum = response.data.billCount
                    this.providerNum = response.data.providerCount
                    this.userNum = response.data.userCount
                },
                error => {
                    console.log(error.message);
                }
            )
        },
    }
</script>
<style scoped>
    .el-card {
        background-color: #FFF;
        height: 164px;
        text-align: center;
    }
    h1{
        margin-top: 5px;
        color: #545c64;
        line-height: 40px;
    }
    p{
        font-size: 50px;
        line-height: 50px;
        margin-top: 10px;
    }
</style>