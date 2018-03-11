import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import jquery from 'jquery';
import metismenu from 'metismenu';
import bootstrap from 'bootstrap';

import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'
import './../public/styles/style.css'

import { store } from './_helpers';
import { App } from './App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);