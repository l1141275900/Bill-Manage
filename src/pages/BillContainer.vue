<template lang="">
    <div>
        <PageHeader :title="'账单管理'"></PageHeader>
        <BillSearch :userType="userType"></BillSearch>
        <BillList :userType="userType"></BillList>
        <BillPage class="page"></BillPage>
    </div>
</template>
<script>
    import PageHeader from '../components/PageHeader'
    import BillList from '../components/bill/BillList'
    import BillSearch from '../components/bill/BillSearch'
    import BillPage from '../components/Page'
export default {
    name:'BillContainer',
    components:{PageHeader,BillList,BillSearch,BillPage},
    data() {
        return {
            userType:''
        }
    },
    mounted() {
        this.userType = this.$store.state.userType
    },
}
</script>
<style scoped>
    .page{
        text-align: center;
        margin-top: 6px;
    }
</style>