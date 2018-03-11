import {BASE_URL, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest} from './Requests';

const PATH_MODIFIER = 'SiteTemplates/';
const URL = BASE_URL + PATH_MODIFIER;

export function deleteSiteTemplate(id, onSuccess, onError) {
    makeDeleteRequest(URL + id, onSuccess, onError);
}