/**
 * @module users/api/UsersApi
 */
'use strict'

import { doneHandler, failureHandler } from '../../../lib/api/apiHandlers'

const BASE_URL = 'http://localhost:3000/api/v1'


/**
 * Lists users.
 *
 * @method
 * @param {string} token - The JWT token
 * @returns {Promise.<Array, Error>}
 */
export const list = token => {
    return fetch(`${BASE_URL}/users`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}

/**
 * Gets a user by its id.
 *
 * @method
 * @param {string} token - The JWT token
 * @param {string} id    - The user id
 * @returns {Promise.<User, Error>}
 */
export const get = (token, id) => {
    return fetch(`${BASE_URL}/users/${id}`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}
