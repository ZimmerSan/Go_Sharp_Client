export function authHeader() {
    // return authorization header with jwt token
    let token_obj = JSON.parse(localStorage.getItem('token'));

    if (token_obj && token_obj.access_token) {
        return { 'Authorization': 'Bearer ' + token_obj.access_token };
    } else {
        return {};
    }
}

export function authJsonHeader() {
    // return authorization header with jwt token
    let token_obj = JSON.parse(localStorage.getItem('token'));

    if (token_obj && token_obj.access_token) {
        return {
            'Authorization': 'Bearer ' + token_obj.access_token,
            'Content-Type': 'application/json'
        };
    } else {
        return {'Content-Type': 'application/json'};
    }
}