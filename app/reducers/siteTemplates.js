import {} from "../actions/actionTypes";
import {SITE_TEMPLATE_LOAD, SITE_TEMPLATE_ADD, SITE_TEMPLATE_UPDATE, SITE_TEMPLATE_DELETE} from "../actions/actionTypes";

export default (state = [], action) => {
    switch(action.type) {
        case SITE_TEMPLATE_LOAD:
            return [...action.siteTemplates];
        case SITE_TEMPLATE_ADD:
            let newState = JSON.parse(JSON.stringify(state));
            newState.push(action.siteTemplate);
            return newState;
        case SITE_TEMPLATE_UPDATE:
            newState = [];
            state.forEach(function (siteTemplate) {
                if (siteTemplate.id == action.siteTemplate.id) newState.push(action.siteTemplate);
                else newState.push(siteTemplate);
            });
            return newState;
        case SITE_TEMPLATE_DELETE:
            return state.filter(siteTemplate => siteTemplate.id != action.id);
        default: return state;
    }
};