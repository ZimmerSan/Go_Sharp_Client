export const BACKEND_URL = "http://localhost:63360/";
export const API_URL = BACKEND_URL + 'api/';

export function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}