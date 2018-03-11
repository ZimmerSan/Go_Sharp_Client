import { authHeader } from '../_helpers';
import {BACKEND_URL, API_URL, handleResponse} from "./api";
import $ from 'jquery'
import {authJsonHeader} from "../_helpers/auth-header";

const URL = API_URL + 'SiteTemplates/';

export const siteTemplateService = {
    findOne,
    create,
    update,
    deleteOne,
    findAll,
};

function findOne(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(URL + id, requestOptions).then(handleResponse);
}

function create(entity) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(entity),
        headers: authJsonHeader()
    };

    return fetch(URL, requestOptions).then(handleResponse);
}

function update(entity) {
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(entity),
        headers: authJsonHeader()
    };

    return fetch(URL + entity.id, requestOptions).then(handleResponse);
}

function deleteOne(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(URL + id, requestOptions).then(handleResponse);
}

function findAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(URL, requestOptions).then(handleResponse);
}