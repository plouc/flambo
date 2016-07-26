/**
 * @module users/actions/UsersActions
 */
'use strict'

import * as UsersApi from '../api/UsersApi'
import {
    REQUEST_USERS,
    RECEIVE_USERS,
    USERS_FETCH_ERROR,
    INVALIDATE_USERS,
} from '../constants/usersActionTypes'

const requestUsers = () => ({
    type: REQUEST_USERS,
})

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users,
})

const usersFetchError = status => ({
    type: USERS_FETCH_ERROR,
    status,
})

const fetchUsers = () => (dispatch, getState) => {
    dispatch(requestUsers())

    const { auth: { token } } = getState()

    UsersApi.list(token)
        .then(users => {
            dispatch(receiveUsers(users))
        })
        .catch(status => {
            dispatch(usersFetchError(status))
        })
}

/**
 * Check if users should be fetched.
 *
 * @param {Object} state - Current state
 * @returns {boolean}
 */
const shouldFetchUsers = state => {
    const { users: { isFetching, didInvalidate } } = state

    if (isFetching) {
        return false
    } else {
        return didInvalidate
    }
}

/**
 * Fetch users if they have been invalidated.
 *
 * @returns {null|function}
 */
export function fetchUsersIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchUsers(getState())) {
            return dispatch(fetchUsers())
        }
    }
}

export const invalidateUsers = () => ({
    type: INVALIDATE_USERS,
})
