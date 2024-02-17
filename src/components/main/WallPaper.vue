<template lang="">
    <el-card shadow="hover">
        <div @click="getPaper">
            <i class="el-icon-magic-stick"></i>
            <p>切换背景图片</p>
        </div>
    </el-card>
</template>
<script>
    export default {
        name: 'WallPaper',
        data() {
            return {
                index: 0,
                wallPaperAniUrl:[
                    'https://img.xjh.me/img/59322814_p0.jpg',
                    'https://img.xjh.me/img/63045318_p0.jpg',
                    'https://img.xjh.me/img/60354469_p0.jpg',
                    'https://img.xjh.me/img/63912855_p0.jpg',
                    'https://img.xjh.me/img/65081874_p0.jpg',
                    'https://img.xjh.me/img/64082849_p0.jpg',
                    'https://img.xjh.me/img/63513874_p0.jpg',
                    'https://img.xjh.me/img/63374320_p0.jpg',
                    'https://img.xjh.me/img/57249743_p0.jpg',
                    'https://img.xjh.me/img/63301084_p0.jpg',
                    'https://img.xjh.me/img/63409027_p0.jpg',
                    'https://tva2.sinaimg.cn/mw1024/006yt1Omgy1guk1ic6litj61b80xub2902.jpg',
                    'https://img.xjh.me/img/62555893_p0.jpg',
                    'https://img.xjh.me/img/59519837_p0.jpg',
                    'https://img.xjh.me/img/63606459_p0.jpg',
                    'https://img.xjh.me/img/63577828_p0.jpg',
                ],
            }
        },
        methods: {
            getPaper() {
                this.$bus.$emit('delColor')
                if(this.index === this.wallPaperAniUrl.length){
                    this.index = 0
                }
                let paperObj = {
                    url:this.wallPaperAniUrl[this.index],
                    type:'picture'
                }
                this.$bus.$emit('wallPaper',paperObj)
                this.index++
            }
        },
    }
</script>
<style scoped>
    .el-card {
        background-color: rgba(249,139,166,0.5);
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