import React from 'react'
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import {Provider} from "react-redux";

import MainLayout from '../components/layouts/Main';

const Root = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={MainLayout}/>
        </BrowserRouter>
    </Provider>
);

export default Root;