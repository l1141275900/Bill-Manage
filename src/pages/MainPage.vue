<template lang="">
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <UserCard></UserCard>
            </el-col>
            <el-col :span="16">
                <CountCard></CountCard>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <AccessAmount></AccessAmount>
            </el-col>
            <el-col :span="12">
                <NewUser></NewUser>
            </el-col>
            <el-col :span="4">
                <WallPaper></WallPaper>
            </el-col>
            <el-col :span="4">
                <WallPaperNat></WallPaperNat>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="16">
                <UnPaid></UnPaid>
            </el-col>
            <el-col :span="8">
                <Weather></Weather>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import UserCard from '../components/main/UserCard'
    import CountCard from '../components/main/CountCard'
    import AccessAmount from '../components/main/AccessAmount'
    import NewUser from '../components/main/NewUser'
    import WallPaper from '../components/main/WallPaper'
    import WallPaperNat from '../components/main/WallPaperNat'
    import UnPaid from '../components/main/UnPaid'
    import Weather from '../components/main/Weather'
    
    export default {
        name: 'MainPage',
        components: {
            UserCard,
            CountCard,
            AccessAmount,
            NewUser,
            WallPaper,
            WallPaperNat,
            UnPaid,
            Weather
        },
        data() {
            return {
                user: ''
            }
        },
        mounted() {
            this.user = this.$store.state
        },
    }
</script>
<style scoped>
    .el-col {
        border-radius: 4px;
        margin-bottom: 10px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        /* background: #e5e9f2; */
        background-color: #FFF;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>