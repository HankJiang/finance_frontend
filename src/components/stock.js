import React from "react";

import Candlestick from './ecarts/Candlestick'
import { request } from '../request'
import moment from "moment"

export default class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.getStockData(props.code, props.start, props.end)
    }

    render() {
        return (
            <div>
                <Candlestick option={this.makeOptions()} />
            </div>
        )
    }

    // 监听父组件
    componentWillReceiveProps(nextProps) {
        this.getStockData(nextProps.code, nextProps.start, nextProps.end)
    }

    getStockData = (code, start, end) => {
        request.get(`/stock/${code}/history`, {params: {start: start, end: end}})
            .then((resp) => {
                this.setState({data: this.splitData(resp.data),});
            }).catch((resp) => {});
    };


    splitData = (rawData) => {
        let category_data = [];
        let values = [];
        for (let i = 0; i < rawData.length; i++) {
            let day_data = rawData[i];
            let date = moment(day_data.trade_date, 'YYYYMMDD').format('YYYY/MM/DD'); // 20200101 => 2020/01/01
            category_data.push(date);
            values.push([day_data.open, day_data.close, day_data.low, day_data.high])
        }
        return {
            categoryData: category_data,
            values: values
        };
    };

    calculateMA = (dayCount) => {
        let result = [];
        for (let i = 0, len = this.state.data.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            let sum = 0;
            for (let j = 0; j < dayCount; j++) {
                sum += this.state.data.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    };

    makeOptions = () => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: this.state.data.categoryData,
                scale: true,
                boundaryGap : false,
                axisLine: {onZero: false},
                splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            series: [
                {
                    name: '日K',
                    type: 'candlestick',
                    data: this.state.data.values,
                    markPoint: {
                        label: {
                            normal: {
                                formatter: function (param) {
                                    return param != null ? Math.round(param.value) : '';
                                }
                            }
                        },
                        data: [
                            {
                                name: 'XX标点',
                                coord: ['2013/5/31', 2300],
                                value: 2300,
                                itemStyle: {
                                    normal: {color: 'rgb(41,60,85)'}
                                }
                            },
                            {
                                name: 'highest value',
                                type: 'max',
                                valueDim: 'highest'
                            },
                            {
                                name: 'lowest value',
                                type: 'min',
                                valueDim: 'lowest'
                            },
                            {
                                name: 'average value on close',
                                type: 'average',
                                valueDim: 'close'
                            }
                        ],
                        tooltip: {
                            formatter: function (param) {
                                return param.name + '<br>' + (param.data.coord || '');
                            }
                        }
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                        data: [
                            [
                                {
                                    name: 'from lowest to highest',
                                    type: 'min',
                                    valueDim: 'lowest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: {show: false},
                                        emphasis: {show: false}
                                    }
                                },
                                {
                                    type: 'max',
                                    valueDim: 'highest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: {show: false},
                                        emphasis: {show: false}
                                    }
                                }
                            ],
                            {
                                name: 'min line on close',
                                type: 'min',
                                valueDim: 'close'
                            },
                            {
                                name: 'max line on close',
                                type: 'max',
                                valueDim: 'close'
                            }
                        ]
                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: this.calculateMA(5),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: this.calculateMA(10),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: this.calculateMA(20),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: this.calculateMA(30),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
            ]
        };
    };
}
