import React from "react";

import Candlestick from './ecarts/Candlestick'
import { request } from '../request'

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
        request.get('/stock/kline', {params: {code: code, start: start, end: end}})
            .then((resp) => {
                this.setState({data: this.splitData(resp.data),});
            }).catch((resp) => {});
    };


    // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
    // {
    //     "Adj Close": 7.2300000191,
    //     "Close": 7.2300000191,
    //     "Date": "2020-08-03T00:00:00.000Z",
    //     "High": 7.2800002098,
    //     "Low": 7.1500000954,
    //     "Open": 7.1500000954,
    //     "Volume": 28438819
    // }
    splitData = (rawData) => {
        let categoryData = [];
        let values = [];
        for (let i = 0; i < rawData.length; i++) {
            let dayData = rawData[i];
            categoryData.push(dayData.Date.split('T')[0].replace('-', '/').replace('-', '/'));
            values.push([dayData.Open, dayData.Close, dayData.Low, dayData.High])
        }
        return {
            categoryData: categoryData,
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
