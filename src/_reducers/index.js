import { combineReducers } from 'redux';
import { siteTemplates } from './site-templates.reducer'
import { authentication } from './authentication.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import {cart} from "./cart.reducer";
import {orders} from "./orders.reducer";
import {projects} from "./projects.reducer";

const RootReducer = combineReducers({
    authentication,
    users,
    alert,
    cart,
    siteTemplates,
    orders,
    projects
});

export default RootReducer