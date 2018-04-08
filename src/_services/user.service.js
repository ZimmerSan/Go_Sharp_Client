import { authHeader } from '../_helpers';
import {BACKEND_URL, API_URL} from "./api";
import jwt_decode from 'jwt-decode';
import {authJsonHeader} from "../_helpers/auth-header";

const URL = API_URL + 'accounts/users/';

export const userService = {
    login,
    register,
    logout,
    updateRole,
    getAll,
    findOne,
    updateOne,
    findOneFull,
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
            return findOne(id).then(user => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                }

                return user;
            })
        });
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(URL, requestOptions).then(handleResponse)
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

    return fetch(URL, requestOptions).then(handleResponse);
}

function findOne(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(URL + id, requestOptions).then(handleResponse);
}

function updateOne(entity) {
    const requestOptions = {
        method: 'PUT',
        headers: authJsonHeader(),
        body: JSON.stringify(entity)
    };

    return fetch(URL + entity.id, requestOptions).then(handleResponse);
}

function findOneFull(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(URL + id + '/full', requestOptions).then(handleResponse);
}

function updateRole(id, roles) {
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(roles),
        headers: authJsonHeader()
    };

    return fetch(URL + id + '/roles', requestOptions).then(response => {
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }

        return response;
    });
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}