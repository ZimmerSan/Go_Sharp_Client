import { authHeader } from '../_helpers';
import {BACKEND_URL, API_URL} from "./api";
import jwt_decode from 'jwt-decode';

export const userService = {
    login,
    logout,
    getAll
};

function login(username, password) {
    let req = 'grant_type=password&username=' + username + '&password=' + password;

    const requestOptions = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        body: req
    };

    return fetch(BACKEND_URL + 'oauth/token', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(token => {
            // login successful if there's a jwt token in the response
            if (token && token.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(token));
                return jwt_decode(token.access_token).nameid;
            } else {
                return Promise.reject(token);
            }
        })
        .then(id => {
            return getOne(id).then(user => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                }

                return user;
            })
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);
}

function getOne(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(API_URL + 'accounts/users/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}