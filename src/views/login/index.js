import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Card from '@material-ui/core/Card';
import Alert from '@material-ui/lab/Alert';

import './login.sass'
import { request } from '../../request'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            showAlert: false,
            username: '',
            password: ''
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    render() {
        return (
            <Card className={'V-login'}>
                <div>
                    <TextField id="username" label="username" value={this.state.username} onChange={e=>{this.setState({username: e.target.value})}}/>
                </div>
                <div>
                    <TextField id="password" label="password" type="password" value={this.state.password} onChange={e=>{this.setState({password: e.target.value})}}/>
                </div>
                <div>
                    <ButtonGroup variant="text" color="primary" aria-label="outlined primary button group">
                        <Button onClick={this.handleLogin}>登录</Button>
                        <Button onClick={this.handleRegister}>注册</Button>
                    </ButtonGroup>
                </div>
                { this.state.showAlert ? <Alert severity="info"> {this.state.message } </Alert> : '' }
            </Card>
        )
    }

    handleLogin() {
        request.post('/auth/login', {
            username: this.state.username,
            password: this.state.password
        }).then((resp) => {
            this.setState({
                message: 'success',
                showAlert: true
            });
            this.gotoHome()
        }).catch((resp) => {
            this.setState({
                message: resp.response.data.error_msg,
                showAlert: true
            })
        });
    }

    handleRegister = () => {
        request.post('/auth/register', {
            username: this.state.username,
            password: this.state.password
        }).then((resp) => {
            this.setState({
                message: 'success',
                showAlert: true
            });
            this.gotoHome()
        }).catch((resp) => {
            this.setState({
                message: resp.response.data.error_msg,
                showAlert: true
            })
        });
    };

    gotoHome() {
        this.props.history.push('/home')
    }
}

export default Login
