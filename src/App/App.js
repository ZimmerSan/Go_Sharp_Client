import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import BlankLayout from "../_components/layouts/BlankLayout";
import MainLayout from "../_components/layouts/MainLayout";

class App extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
    }

    render() {
        const { alert } = this.props;
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/login" component={BlankLayout}/>
                    <Route exact path="/register" component={BlankLayout}/>
                    <PrivateRoute path="/" component={MainLayout}/>
                </Switch>
            </Router>
        );
    }
}

const connectedApp = App;
export { connectedApp as App };