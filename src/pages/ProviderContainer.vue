<template lang="">
    <div>
        <PageHeader :title="'供应商管理'"></PageHeader>
        <ProviderSearch :userType="userType"></ProviderSearch>
        <ProviderList :userType="userType"></ProviderList>
        <Page class="page"></Page>
    </div>
</template>
<script>
    import PageHeader from '../components/PageHeader'
    import ProviderSearch from '../components/provider/ProviderSearch'
    import ProviderList from '../components/provider/ProviderList'
    import Page from '../components/Page'
    export default {
        name: 'ProviderContainer',
        components: {
            PageHeader,
            ProviderSearch,
            ProviderList,
            Page
        },
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