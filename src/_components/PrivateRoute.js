import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {checkRole} from "../_helpers/index";

export const PrivateRoute = ({component: Component, allowedRoles, ...rest}) => (
    <Route {...rest} render={props => {
        let item = localStorage.getItem('user');
        if (item) {
            item = JSON.parse(item);
            if (allowedRoles) {
                return checkRole(item.roles, allowedRoles)
                    ? <Component {...props} />
                    : <Redirect to={{pathname: '/', state: {from: props.location}}}/>;
            } else {
                return <Component {...props} />;
            }
        } else {
            return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>;
        }
    }}/>
);