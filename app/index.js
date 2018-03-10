import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import reducer from "./reducers";
import Root from "./config/routes";

import jquery from 'jquery';
import metismenu from 'metismenu';
import bootstrap from 'bootstrap';

import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'
import './../public/styles/style.css'

export const store = createStore(reducer);

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
);