<template lang="">
    <div>
        <el-page-header @back="goBack" :content="title" title="返回主页">
        </el-page-header>
    </div>
</template>
<script>
    export default {
        name: 'PageHeader',
        props: ['title'],
        methods: {
            goBack() {
                this.$router.push({path:'/'})
            }
        }
    }
</script>
<style scoped>
    div {
        margin-bottom: 15px;
    }
</style>