import { authHeader } from '../_helpers';
import {BACKEND_URL, API_URL, handleResponse} from "./api";
import $ from 'jquery'
import {authJsonHeader} from "../_helpers/auth-header";

const URL = API_URL + 'cart/';

export const cartService = {
    addItem,
    deleteItem,
    getCart,
    createCart,
};

function getCart() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(URL, requestOptions)
        .then(handleResponse)
        .then( cart => {
            localStorage.setItem('cart', JSON.stringify(cart));
            return cart;
        }
    );
}

function addItem(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return fetch(URL + 'items/' + id, requestOptions)
        .then(handleResponse)
        .then(cart => {
                localStorage.setItem('cart', JSON.stringify(cart));
                return cart;
            }
        );
}

function deleteItem(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(URL + 'items/' + id, requestOptions)
        .then(handleResponse)
        .then(cart => {
                localStorage.setItem('cart', JSON.stringify(cart));
                return cart;
            }
        );
}

function createCart() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return fetch(URL + 'create', requestOptions)
        .then(handleResponse)
        .then(cart => {
                localStorage.setItem('cart', JSON.stringify(cart));
                return cart;
            }
        );
}