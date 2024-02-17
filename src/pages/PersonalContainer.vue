<template lang="">
    <div>
        <PageHeader :title="'个人信息'"></PageHeader>
        <Personal></Personal>
    </div>
</template>
<script>
    import Personal from '../components/personal/Personal'
    import PageHeader from '../components/PageHeader'
    export default {
        name: 'PersonalContainer',
        components: {
            PageHeader,
            Personal
        }
    }
</script>
<style lang="">

</style>