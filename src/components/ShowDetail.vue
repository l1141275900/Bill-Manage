<template lang="">
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="40%">
        <slot name="msg1"></slot>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeShow">取 消</el-button>
            <el-button type="primary" @click="toModify">编 辑</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        name: 'ShowDetail',
        data() {
            return {
                dialogVisible: false,
                id: 0,
            };
        },
        methods: {
            closeShow(){
                this.dialogVisible = false
            },
            openShow(id){
                this.dialogVisible = true
                this.id = id
            },
            toModify(){
                this.$bus.$emit('toModify',this.id)
                this.closeShow()
            }
        },
    }
</script>
<style lang="">

</style>