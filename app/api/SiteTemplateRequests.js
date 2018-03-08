import {BASE_URL} from './Requests';
import Axios from 'axios';

const PATH_MODIFIER = 'SiteTemplates/';
const URL = BASE_URL + PATH_MODIFIER;

export function getAllSiteTemplates(onSuccess, onError) {
    Axios.get(URL).then(onSuccess).catch(onError);
}