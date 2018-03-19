import { projectConstants } from '../_constants';

export function projects(state = {}, action) {
    switch (action.type) {
        case projectConstants.CREATE_REQUEST:
        case projectConstants.FIND_REQUEST:
        case projectConstants.DELETE_REQUEST:
        case projectConstants.CHANGE_STATUS_REQUEST:
        case projectConstants.FIND_ALL_REQUEST:
            return {
                loading: true
            };
        case projectConstants.CREATE_SUCCESS:
            let newList = state.items ? state.items : [];
            newList.push(action.project);
            return {
                items: newList,
                created_item: action.project,
            };
        case projectConstants.FIND_SUCCESS:
            return {
                item: action.project
            };
        case projectConstants.DELETE_SUCCESS:
            return (state.items ? state.items : []).filter(project => project.id !== action.id);
        case projectConstants.CHANGE_STATUS_SUCCESS:
            newList = [];
            if (state.items) state.items.forEach(project => {
                if (project.id === action.project.id) newList.push(action.project);
                else newList.push(project);
            });
            return {
                items: newList,
                item: action.project,
            };
        case projectConstants.FIND_ALL_SUCCESS:
            return {
                items: action.projects
            };
        case projectConstants.CREATE_FAILURE:
        case projectConstants.FIND_FAILURE:
        case projectConstants.DELETE_FAILURE:
        case projectConstants.UPDATE_FAILURE:
        case projectConstants.FIND_ALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}