import request from 'axios';
import axios from 'axios';
export const USER_AUTH = 'USER_AUTH';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_AUTH_FAIL = 'USER_AUTH_FAIL';
export const USER_IS_AUTHENTICATED = 'USER_IS_AUTHENTICATED';
export const USER_ME_UPDATE = 'USER_ME_UPDATE';
export const USER_NEW = 'USER_NEW';
export const USER_NEW_ID = 'USER_NEW_ID';
export const USER_HEARTRATES = 'USER_HEARTRATES';

export const RECEIVE_ME = 'RECEIVE_ME';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const DELETE_DATA = 'DELETE_DATA';
export const SENT_DATA = 'SENT_DATA';
///http://18.194.142.39/api/Client
const API_URL = 'http://18.194.142.39/api/';

export function signup(email, companyName) {
	const params = {
    email:email,
    companyName:companyName
	}
	return {
		type : USER_SIGNUP,
		promise: request.post(API_URL + '/api/signup', params)
	}
}

export function putMe(me, token) {
	return {
		type : USER_ME_UPDATE,
		promise: request.post(API_URL + '/api/users/me', me,
		{
			headers: {
				'x-access-token': token
			}
		})
	}
}

export function getClientID() {
	return axios.get(API_URL + 'Client');
}

export function getHeartRates (clientId) {
	return {
		type: USER_HEARTRATES,
		promise: request.get(API_URL + 'HeartRates/' + clientId, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			console.log(response);
		}).catch(function(error) {
			console.log(error);
		})
	}
}

export function postClient(body) {
    return {
        type : USER_NEW,
        promise: request.post(API_URL + 'Client', JSON.stringify(body),
            {
                headers: {
                    //'x-access-token': token
					'Content-Type': 'application/json'
                }
            }).then(function(response) {
            	console.log(response);
			}).catch(function(error) {
				console.log(error);
			})
    }
}

export function handleRedirect(res, url) {
	if(res.status == 200) {
		window.location.href = url;
	} else {
		// should handle exception;
	}
}

export function auth(email, pass) {
	const params = {
    email:email,
    password:pass
	}
	return {
		type : USER_AUTH,
		promise: request.post(API_URL + '/authenticate', params)
	}
}

export function logout() {
	return {
		type : USER_LOGOUT
	}
}

export function isAuthenticated() {
	return {
		type : USER_IS_AUTHENTICATED
	}
}

export function fetchUsers(token) {
	return {
		type: RECEIVE_USERS,
		promise: request.get(API_URL + '/api/users/',{
			headers: {
				'x-access-token': token
			}
		})
	}
}

export function fetchMe(token) {
	return {
		type: RECEIVE_ME,
		promise: request.get(API_URL + '/api/users/me/', {
			headers: {
				'x-access-token': token
			}
		})
	}
}
