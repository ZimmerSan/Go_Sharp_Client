import { orderConstants } from '../_constants';
import { orderService } from "../_services";
import { alertActions, cartActions } from "./";

export const orderActions = {
    create,
    findOne,
    changeStatus,
    findAll,
};

function findOne(id) {
    return dispatch => {
        dispatch(request({id}));

        orderService.findOne(id)
            .then(
                order => {
                    dispatch(success(order));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(order) { return { type: orderConstants.FIND_REQUEST, order } }
    function success(order) { return { type: orderConstants.FIND_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.FIND_FAILURE, error } }
}

function create(entity) {
    return dispatch => {
        dispatch(request(entity));

        orderService.create(entity)
            .then(
                order => {
                    dispatch(success(order));
                    dispatch(cartActions.getCart());
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(order) { return { type: orderConstants.CREATE_REQUEST, order } }
    function success(order) { return { type: orderConstants.CREATE_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.CREATE_FAILURE, error } }
}

function changeStatus(id, status) {
    return dispatch => {
        dispatch(request(id, status));

        orderService.changeStatus(id, status)
            .then(
                order => {
                    dispatch(success(order));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id, status) { return { type: orderConstants.CHANGE_STATUS_REQUEST, id, status } }
    function success(order) { return { type: orderConstants.CHANGE_STATUS_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.CHANGE_STATUS_FAILURE, error } }
}

// function deleteOne(id) {
//     return dispatch => {
//         dispatch(request(id));
//
//         orderService.deleteOne(id)
//             .then(
//                 order => {
//                     dispatch(success(order));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };
//
//     function request(id) { return { type: orderConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: orderConstants.DELETE_SUCCESS, id } }
//     function failure(error) { return { type: orderConstants.DELETE_FAILURE, error } }
// }

function findAll() {
    return dispatch => {
        dispatch(request());

        orderService.findAll()
            .then(
                orders => {
                    dispatch(success(orders));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: orderConstants.FIND_ALL_REQUEST } }
    function success(orders) { return { type: orderConstants.FIND_ALL_SUCCESS, orders } }
    function failure(error) { return { type: orderConstants.FIND_ALL_FAILURE, error } }
}