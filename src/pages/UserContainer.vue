<template lang="">
    <div>
        <PageHeader :title="'用户管理'"></PageHeader>
        <UserSearch :userType="userType"></UserSearch>
        <UserList :userType="userType"></UserList>
        <UserPage class="page"></UserPage>
    </div>
</template>
<script>
    import PageHeader from '../components/PageHeader'
    import UserList from '../components/user/UserList'
    import UserSearch from '../components/user/UserSearch'
    import UserPage from '../components/Page'
    export default {
        name: 'UserContainer',
        components: {
            PageHeader,
            UserList,
            UserSearch,
            UserPage
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
    .page {
        text-align: center;
        margin-top: 6px;
    }
</style>