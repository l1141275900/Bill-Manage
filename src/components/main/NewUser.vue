<template lang="">
    <el-card shadow="hover">
        <v-chart autoresize :option="option" style="height: 300px;"></v-chart>
    </el-card>
</template>
<script>
    import * as echarts from 'echarts/core';
    import {
        TitleComponent,
        ToolboxComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent
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

    echarts.use([
        TitleComponent,
        ToolboxComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        LineChart,
        CanvasRenderer,
        UniversalTransition
    ]);
    export default {
        name: 'NewUser',
        data() {
            return {
                provider: [5,3,2,6,1],
                bill: [10,23,6,9,11],
                date: ['2月13日','2月14日','2月15日','2月16日','2月17日'],
                total:[15,26,8,15,12]
            }
        },
        computed: {
            option() {
                return {
                    title: {
                        text: '近五天新增数据'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['账单', '供应商', '合计']
                    },
                    grid: {
                        left: '5%',
                        right: '8%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.date
                    },
                    yAxis: {
                        minInterval: 1,
                        type: 'value'
                    },
                    series: [{
                            name: '账单',
                            type: 'line',
                            data: this.bill
                        },
                        {
                            name: '供应商',
                            type: 'line',
                            data: this.provider
                        },
                        {
                            name: '合计',
                            type: 'line',
                            data: this.total
                        }
                    ]
                }
            }
        },
        mounted() {
            this.$axios.get('/index/fiveAdd').then(
                response => {
                    let provider = response.data.providerAdd
                    let bill = response.data.billAdd
                    let providerNum = []
                    let billNum = []
                    let date = []
                    let total = []
                    for (let i = 0; i < provider.length; i++) {
                        providerNum.push(provider[i].count)
                        billNum.push(bill[i].count)
                        date.push(bill[i].date)
                        total.push(provider[i].count + bill[i].count)
                    }
                    this.provider = providerNum
                    this.bill = billNum
                    this.date = date
                    this.total = total
                },
                error => {
                    console.log(error.message);
                }
            )
        },
    }
</script>
<style scoped>
    .el-card {
        background-color: #FFF;
    }
</style>