/**
 * @module users/actions/UserActions
 */
'use strict'

import * as UsersApi from '../api/UsersApi'
import {
    REQUEST_USER,
    RECEIVE_USER,
    USER_FETCH_ERROR,
} from '../constants/usersActionTypes'


const requestUser = userId => ({
    type: REQUEST_USER,
    userId,
})

const receiveUser = (userId, user) => ({
    type: RECEIVE_USER,
    userId,
    user,
})

const userFetchError = (userId, status) => ({
    type: USER_FETCH_ERROR,
    userId,
    status,
})


const fetchUser = id => (dispatch, getState) => {
    dispatch(requestUser(id))

    const { auth: { token } } = getState()

    UsersApi.get(token, id)
        .then(user => {
            dispatch(receiveUser(id, user))
        })
        .catch(status => {
            dispatch(userFetchError(id, status))
        })
}

/**
 * Check if a user should be fetched.
 *
 * @param {Object} state - Current state
 * @param {string} id    - The user id
 * @returns {boolean}
 */
const shouldFetchUser = (state, id) => {
    const user = state.userById[id]

    if (!user) {
        return true
    } else if (user.isFetching) {
        return false
    } else {
        return user.didInvalidate
    }
}

/**
 * Fetch a user by its id if it does not exist
 * in current state or have been invalidated.
 *
 * @param {string} id - The user id
 * @returns {null|function}
 */
export function fetchUserIfNeeded(id) {
    return (dispatch, getState) => {
        if (shouldFetchUser(getState(), id)) {
            return dispatch(fetchUser(id))
        }
    }
}
