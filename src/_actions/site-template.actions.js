import { siteTemplateConstants } from '../_constants';
import { siteTemplateService } from "../_services";
import { alertActions } from "./";

export const siteTemplateActions = {
    create,
    findOne,
    update,
    deleteOne,
    findAll,
};

function findOne(id) {
    return dispatch => {
        dispatch(request({id}));

        siteTemplateService.findOne(id)
            .then(
                siteTemplate => {
                    dispatch(success(siteTemplate));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(siteTemplate) { return { type: siteTemplateConstants.GET_REQUEST, siteTemplate } }
    function success(siteTemplate) { return { type: siteTemplateConstants.GET_SUCCESS, siteTemplate } }
    function failure(error) { return { type: siteTemplateConstants.GET_FAILURE, error } }
}

function create(entity) {
    return dispatch => {
        dispatch(request(entity));

        siteTemplateService.create(entity)
            .then(
                siteTemplate => {
                    dispatch(success(siteTemplate));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(siteTemplate) { return { type: siteTemplateConstants.CREATE_REQUEST, siteTemplate } }
    function success(siteTemplate) { return { type: siteTemplateConstants.CREATE_SUCCESS, siteTemplate } }
    function failure(error) { return { type: siteTemplateConstants.CREATE_FAILURE, error } }
}

function update(entity) {
    return dispatch => {
        dispatch(request(entity));

        siteTemplateService.update(entity)
            .then(
                siteTemplate => {
                    dispatch(success(siteTemplate));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(siteTemplate) { return { type: siteTemplateConstants.UPDATE_REQUEST, siteTemplate } }
    function success(siteTemplate) { return { type: siteTemplateConstants.UPDATE_SUCCESS, siteTemplate } }
    function failure(error) { return { type: siteTemplateConstants.UPDATE_FAILURE, error } }
}

function deleteOne(id) {
    return dispatch => {
        dispatch(request(id));

        siteTemplateService.deleteOne(id)
            .then(
                siteTemplate => {
                    dispatch(success(siteTemplate));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: siteTemplateConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: siteTemplateConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: siteTemplateConstants.DELETE_FAILURE, error } }
}

function findAll() {
    return dispatch => {
        dispatch(request());

        siteTemplateService.findAll()
            .then(
                siteTemplates => {
                    dispatch(success(siteTemplates));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: siteTemplateConstants.FIND_ALL_REQUEST } }
    function success(siteTemplates) { return { type: siteTemplateConstants.FIND_ALL_SUCCESS, siteTemplates } }
    function failure(error) { return { type: siteTemplateConstants.FIND_ALL_FAILURE, error } }
}