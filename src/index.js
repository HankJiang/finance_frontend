import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import './assets/style/frame.sass'
import Login from './views/login'
import Home from './views/home'


ReactDOM.render(
    <Fragment>
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route exact path="/" component={Home} />
                <Redirect to={"/home"} />
            </Switch>
        </HashRouter>
    </Fragment>,
    document.getElementById('root')
);
