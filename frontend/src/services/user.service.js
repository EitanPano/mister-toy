const axios = require('axios');

import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js';

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser
}

const USER_URL = _getUrl();

window.userService = userService;

function _getUrl(id = '') {
    const BASE_URL = (process.env.NODE_ENV !== 'development')
        ? '/auth'
        : '//localhost:3000/api/auth';
    return `${BASE_URL}/${id}`
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function login(exUser = {username: 'amnon', password: '123456a'}) {
    return httpService.post('auth/login', exUser )
        .then((user) => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user));
            return user;
        });
}

function logout() {
    return httpService.post('auth/logout').then(() => {
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
        return Promise.resolve()
    })
}

function signup(userInfo) {
    return axios.post('auth/signup', userInfo)
    // return storageService.post(STORAGE_KEY, userInfo)
        .then((res) => res.data)
        .then((user) => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
            return user;
        })
}
