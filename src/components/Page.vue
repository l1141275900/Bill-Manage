<template lang="">
    <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-sizes="[7, 14, 21, 28]"
          :page-size="7"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
</template>
<script>
    export default {
        name:'Page',
        methods: {
            handleSizeChange(val) {
                this.$bus.$emit('changeSize',val)
            },
            handleCurrentChange(val) {
                this.$bus.$emit('changePage',val)
            }
        },
        data() {
            return {
                total:1,
                page:1
            };
        },
        mounted() {
            this.$bus.$on('total',total => {
                this.total = total
            })
            this.$bus.$on('emptyList', () => {
                this.page = this.page - 1
                this.$bus.$emit('changePage',this.page)
            })
        },
        beforeDestroy() {
            this.$bus.$off('total')
            this.$bus.$off('emptyList')
        },
    }
</script>
<style>

</style>