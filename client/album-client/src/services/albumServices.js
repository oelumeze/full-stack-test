import axios from 'axios';

/** API constants */
const API_URL = `http://localhost:3002`;
const ALBUMS_API_URL = `${API_URL}/albums`;
const USERS_API_URL = `${API_URL}/users`;

/**
 * set authorization headers for protected API calls
 * @param {*} _access_token - the user's access_token
 */
const getAuthorizationHeaders = (_access_token) => {
    return {
        'Authorization' : 'Bearer '+_access_token
    }
}

/**
 * get all albums
 * @param {String} _access_token the user's access token
 */
export const getAllAlbums = (_access_token) => {
    return axios.get(`${ALBUMS_API_URL}/showAllAlbums`, { headers: getAuthorizationHeaders(_access_token)});
}

/**
 * create a new album
 * @param {String} _access_token - the user access token 
 * @param {Object} albumInfo - the album information
 */
export const createNewAlbum = (_access_token, albumInfo) => {
    return axios.post(`${ALBUMS_API_URL}/createAlbum`, albumInfo, { headers: getAuthorizationHeaders(_access_token)})
}

/**
 * Edit an exisiting album
 * @param {String} _access_token - the user's access_token
 * @param {String} albumId  - the album ID
 * @param {Object} albumInfo - the album edit information
 */
export const editAlbum = (_access_token, albumId, albumInfo) => {
    return axios.put(`${ALBUMS_API_URL}/updateAlbum/${albumId}`, albumInfo, { headers: getAuthorizationHeaders(_access_token)})
}

/**
 * get an existing album details
 * @param {String} _access_token - the user access token
 * @param {String} albumId - the album ID
 */
export const getAlbumDetails = (_access_token, albumId) => {
    return axios.get(`${ALBUMS_API_URL}/showAlbumById/${albumId}`, { headers: getAuthorizationHeaders(_access_token)})
}

/**
 * delete an album
 * @param {String} _access_token - the user's access_token
 * @param {String} albumId - the album ID
 */
export const deleteAlbum = (_access_token, albumId) => {
    return axios.delete(`${ALBUMS_API_URL}/deleteAlbum/${albumId}`, { headers: getAuthorizationHeaders(_access_token)});
}

/**
 * create a new user
 * @param {String} _userName the username
 * @param {String} _email the user's email
 * @param {String} _password the user's pasword
 */
export const createUser = (_userName, _email, _password) => {
    return axios.post(`${USERS_API_URL}/createUser`, { username: _userName, email: _email, password: _password } )
}

/**
 * authenticate the user
 * @param {String} _email - the user's existing email
 * @param {String} _password - the user's existing password
 */
export const userLogin = (_email, _password) => {
    return axios.post(`${USERS_API_URL}/auth`, { email: _email, password: _password } )
}