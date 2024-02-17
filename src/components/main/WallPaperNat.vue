<template lang="">
    <el-popover placement="left" width="200" trigger="click">
        <div>
            <el-color-picker v-model="color"></el-color-picker>
            <span class="chooseColor">点击选择颜色</span>
        </div>

        </div>
        <el-card shadow="hover" slot="reference">
            <div>
                <i class="el-icon-ship"></i>
                <p>切换纯色背景</p>
            </div>
        </el-card>
    </el-popover>
</template>
<script>
    export default {
        name: 'WallPaperNat',
        data() {
            return {
                color: '',
            }
        },
        watch:{
            color(newValue,oldValue){
                let paperObj = {
                    url:this.color,
                    type:'color'
                }
                if(newValue == null){
                    this.color = '#F5FFF7'
                }
                if(newValue != ''){
                    this.$bus.$emit('wallPaper',paperObj)
                }
            }
        },
        mounted() {
            if(JSON.parse(localStorage.getItem('wallPaper')).type == 'color'){
                this.color = JSON.parse(localStorage.getItem('wallPaper')).url
            }
            this.$bus.$on('delColor',() => {
                this.color = ''
            })
        },
        beforeDestroy() {
            this.$bus.$off('delColor')
        },
    }
</script>
<style scoped>
    .el-card {
        background-color: rgba(38, 157, 128, 0.5);
        color: #FFF;
        height: 165px;
        cursor: pointer;
    }

    div {
        margin: 0 auto;
    }

    i {
        display: block;
        font-size: 100px;
        text-align: center;
    }

    p {
        text-align: center;
    }

</style>