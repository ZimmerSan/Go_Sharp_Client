import { siteTemplateConstants } from '../_constants';

export function siteTemplates(state = { loading: true}, action) {
    switch (action.type) {
        case siteTemplateConstants.CREATE_REQUEST:
        case siteTemplateConstants.GET_REQUEST:
        case siteTemplateConstants.DELETE_REQUEST:
        case siteTemplateConstants.UPDATE_REQUEST:
        case siteTemplateConstants.FIND_ALL_REQUEST:
            return {
                loading: true
            };
        case siteTemplateConstants.CREATE_SUCCESS:
            let newList = state.items ? state.items : [];
            newList.push(action.siteTemplate);
            return {
                items: newList,
                item: action.siteTemplate,
            };
        case siteTemplateConstants.GET_SUCCESS:
            return {
                item: action.siteTemplate
            };
        case siteTemplateConstants.DELETE_SUCCESS:
            return (state.items ? state.items : []).filter(siteTemplate => siteTemplate.id !== action.id);
        case siteTemplateConstants.UPDATE_SUCCESS:
            newList = [];
            if (state.items) state.items.forEach(siteTemplate => {
                if (siteTemplate.id === action.siteTemplate.id) newList.push(action.siteTemplate);
                else newList.push(siteTemplate);
            });
            return {
                items: newList,
                item: action.siteTemplate,
            };
        case siteTemplateConstants.FIND_ALL_SUCCESS:
            return {
                items: action.siteTemplates
            };
        case siteTemplateConstants.CREATE_FAILURE:
        case siteTemplateConstants.GET_FAILURE:
        case siteTemplateConstants.DELETE_FAILURE:
        case siteTemplateConstants.UPDATE_FAILURE:
        case siteTemplateConstants.FIND_ALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}