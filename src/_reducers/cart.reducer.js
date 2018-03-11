import { cartConstants } from '../_constants';

let cartItem = JSON.parse(localStorage.getItem('cart'));
const initialState = cartItem ? { item: cartItem } : {};

export function cart(state = initialState, action) {
    switch (action.type) {
        case cartConstants.CREATE_REQUEST:
        case cartConstants.ADD_REQUEST:
        case cartConstants.DELETE_REQUEST:
        case cartConstants.GET_REQUEST:
            return {...state,
                loading: true
            };
        case cartConstants.CREATE_SUCCESS:
        case cartConstants.ADD_SUCCESS:
        case cartConstants.DELETE_SUCCESS:
        case cartConstants.GET_SUCCESS:
            return {
                item: action.cart
            };
        case cartConstants.CREATE_FAILURE:
        case cartConstants.ADD_FAILURE:
        case cartConstants.DELETE_FAILURE:
        case cartConstants.GET_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}