<template lang="">
    <el-card shadow="hover">
        <div>
            <v-chart autoresize :option="option_column" style="height: 300px"></v-chart>
        </div>
    </el-card>
</template>
<script>
    import * as echarts from 'echarts/core';
    import {
        GridComponent,
        TooltipComponent
    } from 'echarts/components';
    import {
        LineChart
    } from 'echarts/charts';
    import {
        UniversalTransition
    } from 'echarts/features';
    import {
        CanvasRenderer
    } from 'echarts/renderers';
    import {
        TitleComponent
    } from 'echarts/components';

    echarts.use([
        GridComponent,
        UniversalTransition,
        CanvasRenderer,
        LineChart,
        TitleComponent,
        TooltipComponent
    ]);
    export default {
        name: 'AccessAmount',
        data() {
            return {
                date: ['2月13日','2月14日','2月15日','2月16日','2月17日'],
                count: [230,695,760,890,880],
            }
        },
        computed: {
            option_column() {
                return {
                    title: {
                        text: '近五天付款金额'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.date
                    },
                    yAxis: {
                        type: 'value'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '10%',
                        bottom: '3%',
                        containLabel: true
                    },
                    series: [{
                        data: this.count,
                        type: 'line',
                        areaStyle: {}
                    }]
                }
            },
        },
        mounted() {
            this.$axios.get('/index/fiveBill').then(
                response => {
                    let arr = response.data
                    let date = []
                    let count = []
                    for (let i = 0; i < arr.length; i++) {
                        date.push(arr[i].date)
                        count.push(arr[i].count)
                    }
                    this.date = date
                    this.count = count
                },
                error => {
                    console.log(error.message);
                }
            )
        },
    }
</script>
<style scoped>
    div {
        background-color: #FFF;
    }
</style>