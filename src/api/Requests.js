import $ from "jquery";

export const backendUrl = "http://localhost:63360/";
// export const backendUrl = "/";
export const BASE_URL = backendUrl + "api/";

export function makeGetRequest(url, onSuccess, onError, onStart, onEnd) {
    return $.ajax({
        url: url,
        type: "GET",
        crossDomain: true,
        beforeSend: function () {
            if (onStart) onStart();
        },
        success: function (response) {
            if (onSuccess) onSuccess(response);
        },
        error: function (error) {
            if (onError) onError(error);
        },
        complete: function () {
            if (onEnd) onEnd();
        }
    });
}

export function makePutRequest(body, url, onSuccess, onError, onStart, onEnd) {
    $.ajax({
        url: url,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(body),
        crossDomain: true,
        beforeSend: function () {
            if (onStart) onStart();
        },
        success: function (response) {
            if (onSuccess) onSuccess(response);
        },
        error: function (error) {
            if (onError) onError(error);
        },
        complete: function () {
            if (onEnd) onEnd();
        }
    });
}

export function makePostRequest(body, url, onSuccess, onError, onStart, onEnd) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(body),
        crossDomain: true,
        beforeSend: function () {
            if (onStart) onStart();
        },
        success: function (response) {
            if (onSuccess) onSuccess(response);
        },
        error: function (error) {
            if (onError) onError(error);
        },
        complete: function () {
            if (onEnd) onEnd();
        }
    });
}

export function makeDeleteRequest(url, onSuccess, onError, onStart, onEnd) {
    $.ajax({
        url: url,
        type: "DELETE",
        crossDomain: true,
        beforeSend: function () {
            if (onStart) onStart();
        },
        success: function (response) {
            if (onSuccess) onSuccess(response);
        },
        error: function (error) {
            if (onError) onError(error);
        },
        complete: function () {
            if (onEnd) onEnd();
        }
    });
}