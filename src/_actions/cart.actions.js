import { cartConstants } from '../_constants';
import { cartService } from "../_services";
import { alertActions } from "./";

export const cartActions = {
    addItem,
    deleteItem,
    getCart,
    createCart,
};

function getCart() {
    return dispatch => {
        dispatch(request({}));

        cartService.getCart()
            .then(
                cart => {
                    dispatch(success(cart));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(cart) { return { type: cartConstants.GET_REQUEST, cart } }
    function success(cart) { return { type: cartConstants.GET_SUCCESS, cart } }
    function failure(error) { return { type: cartConstants.GET_FAILURE, error } }
}

function addItem(id) {
    return dispatch => {
        dispatch(request({itemId: id}));

        cartService.addItem(id)
            .then(
                cart => {
                    dispatch(success(cart));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(cart) { return { type: cartConstants.ADD_REQUEST, cart } }
    function success(cart) { return { type: cartConstants.ADD_SUCCESS, cart } }
    function failure(error) { return { type: cartConstants.ADD_FAILURE, error } }
}

function deleteItem(id) {
    return dispatch => {
        dispatch(request({itemId: id}));

        cartService.deleteItem(id)
            .then(
                cart => {
                    dispatch(success(cart));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(cart) { return { type: cartConstants.DELETE_REQUEST, cart } }
    function success(cart) { return { type: cartConstants.DELETE_SUCCESS, cart } }
    function failure(error) { return { type: cartConstants.DELETE_FAILURE, error } }
}

function createCart() {
    return dispatch => {
        dispatch(request({itemId: id}));

        cartService.createCart()
            .then(
                cart => {
                    dispatch(success(cart));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(cart) { return { type: cartConstants.CREATE_REQUEST, cart } }
    function success(cart) { return { type: cartConstants.CREATE_SUCCESS, cart } }
    function failure(error) { return { type: cartConstants.CREATE_FAILURE, error } }
}