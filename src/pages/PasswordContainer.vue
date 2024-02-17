<template lang="">
    <div>
        <PageHeader :title="'修改密码'"></PageHeader>
        <PasswordChange></PasswordChange>
    </div>
</template>
<script>
    import PasswordChange from '../components/password/PasswordChange'
    import PageHeader from '../components/PageHeader'
export default {
    name:'PasswordContainer',
    components:{PasswordChange,PageHeader}
}
</script>
<style lang="">
    
</style>