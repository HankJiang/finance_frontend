import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import moment from 'moment'

import './home.sass'
import Stock from '../../components/stock'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time_option: 'this_year',
            stock_code: '002110',
            start_date:  moment().startOf('year').format("YYYY-MM-DD"),
            end_date: moment().format("YYYY-MM-DD")
        }
    }

    render() {
        return (
            <div className={'P-home'}>
                <Stock code={this.state.stock_code} start={this.state.start_date} end={this.state.end_date}/>
                <div className={'P-input_block'}>
                    <TextField id="stock_code" label="请输入6位股票代码" value={this.state.stock_code} onChange={e=>{this.setState({stock_code: e.target.value})}}/>
                    <RadioGroup row value={this.state.time_option} onChange={e=>{this.handleChange(e)}}>
                        <FormControlLabel value="this_year" control={<Radio />} label="年初至今" />
                        <FormControlLabel value="half_year" control={<Radio />} label="近半年" />
                        <FormControlLabel value="one_year" control={<Radio />} label="近一年" />
                        <FormControlLabel value="three_years" control={<Radio />} label="近三年" />
                    </RadioGroup>
                </div>
            </div>
        )
    }

    handleChange = (e) => {
        let time_option = e.target.value;
        this.setState({time_option: time_option});

        let today = moment().format("YYYY-MM-DD");
        this.setState({end_date: today});

        let a = moment().startOf('year').format("YYYY-MM-DD");
        let b = moment().add(-6, 'months').format("YYYY-MM-DD");
        let c = moment().add(-1, 'years').format("YYYY-MM-DD");
        let d = moment().add(-3, 'years').format("YYYY-MM-DD");

        switch(time_option) {
            case 'this_year': {
                this.setState({start_date: a});
                break;
            }
            case 'half_year': {
                this.setState({start_date: b});
                break;
            }
            case 'one_year': {
                this.setState({start_date: c});
                break;
            }
            case 'three_years': {
                this.setState({start_date: d});
                break;
            }
            default: {
                this.setState({start_date: a});
            }
        }
    }
}

export default Home
