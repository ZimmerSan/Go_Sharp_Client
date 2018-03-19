import { orderConstants } from '../_constants';

export function orders(state = {}, action) {
    switch (action.type) {
        case orderConstants.CREATE_REQUEST:
        case orderConstants.FIND_REQUEST:
        case orderConstants.DELETE_REQUEST:
        case orderConstants.CHANGE_STATUS_REQUEST:
        case orderConstants.FIND_ALL_REQUEST:
            return {
                loading: true
            };
        case orderConstants.CREATE_SUCCESS:
            let newList = state.items ? state.items : [];
            newList.push(action.order);
            return {
                items: newList,
                created_item: action.order,
            };
        case orderConstants.FIND_SUCCESS:
            return {
                item: action.order
            };
        case orderConstants.DELETE_SUCCESS:
            return (state.items ? state.items : []).filter(order => order.id !== action.id);
        case orderConstants.CHANGE_STATUS_SUCCESS:
            newList = [];
            if (state.items) state.items.forEach(order => {
                if (order.id === action.order.id) newList.push(action.order);
                else newList.push(order);
            });
            return {
                items: newList,
                item: action.order,
            };
        case orderConstants.FIND_ALL_SUCCESS:
            return {
                items: action.orders
            };
        case orderConstants.CREATE_FAILURE:
        case orderConstants.FIND_FAILURE:
        case orderConstants.DELETE_FAILURE:
        case orderConstants.UPDATE_FAILURE:
        case orderConstants.FIND_ALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}