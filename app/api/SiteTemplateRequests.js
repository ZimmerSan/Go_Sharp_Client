import {BASE_URL, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest} from './Requests';
import {loadSiteTemplates as loadAction} from '../actions/siteTemplateActions'

const PATH_MODIFIER = 'SiteTemplates/';
const URL = BASE_URL + PATH_MODIFIER;

export function loadSiteTemplates(onSuccess, onError) {
    makeGetRequest(URL, loadAction, onError);
}

export function findSiteTemplate(id, onSuccess, onError) {
    makeGetRequest(URL + id, onSuccess, onError);
}

export function updateSiteTemplate(entity, onSuccess, onError) {
    makePutRequest(entity, URL + entity.Id, onSuccess, onError);
}

export function createSiteTemplate(entity, onSuccess, onError) {
    makePostRequest(entity, URL, onSuccess, onError);
}

export function deleteSiteTemplate(id, onSuccess, onError) {
    makeDeleteRequest(URL + id, onSuccess, onError);
}