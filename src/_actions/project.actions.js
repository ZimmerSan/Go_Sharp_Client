import { projectConstants } from '../_constants';
import { projectService } from "../_services";
import { alertActions, cartActions } from "./";

export const projectActions = {
    create,
    findOne,
    changeStatus,
    findAll,
};

function findOne(id) {
    return dispatch => {
        dispatch(request({id}));

        projectService.findOne(id)
            .then(
                project => {
                    dispatch(success(project));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(project) { return { type: projectConstants.FIND_REQUEST, project } }
    function success(project) { return { type: projectConstants.FIND_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.FIND_FAILURE, error } }
}

function create(entity) {
    return dispatch => {
        dispatch(request(entity));

        projectService.create(entity)
            .then(
                project => {
                    dispatch(success(project));
                    dispatch(cartActions.getCart());
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(project) { return { type: projectConstants.CREATE_REQUEST, project } }
    function success(project) { return { type: projectConstants.CREATE_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.CREATE_FAILURE, error } }
}

function changeStatus(id, status) {
    return dispatch => {
        dispatch(request(id, status));

        projectService.changeStatus(id, status)
            .then(
                project => {
                    dispatch(success(project));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id, status) { return { type: projectConstants.CHANGE_STATUS_REQUEST, id, status } }
    function success(project) { return { type: projectConstants.CHANGE_STATUS_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.CHANGE_STATUS_FAILURE, error } }
}

// function deleteOne(id) {
//     return dispatch => {
//         dispatch(request(id));
//
//         projectService.deleteOne(id)
//             .then(
//                 project => {
//                     dispatch(success(project));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };
//
//     function request(id) { return { type: projectConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: projectConstants.DELETE_SUCCESS, id } }
//     function failure(error) { return { type: projectConstants.DELETE_FAILURE, error } }
// }

function findAll() {
    return dispatch => {
        dispatch(request());

        projectService.findAll()
            .then(
                projects => {
                    dispatch(success(projects));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: projectConstants.FIND_ALL_REQUEST } }
    function success(projects) { return { type: projectConstants.FIND_ALL_SUCCESS, projects } }
    function failure(error) { return { type: projectConstants.FIND_ALL_FAILURE, error } }
}