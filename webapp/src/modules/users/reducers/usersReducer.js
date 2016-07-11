/**
 * @module users/reducers/UsersReducer
 */
'use strict'

import {
    REQUEST_USERS,
    RECEIVE_USERS,
    USERS_FETCH_ERROR,
    INVALIDATE_USERS,
} from '../constants/usersActionTypes'


export default function sources(state = {
    users:         [],
    isFetching:    false,
    didInvalidate: true,
    status:        0,
}, action) {
    switch (action.type) {
        case REQUEST_USERS:
            return {
                ...state,
                isFetching: true,
            }

        case RECEIVE_USERS:
            return {
                ...state,
                users:         action.users,
                isFetching:    false,
                didInvalidate: false,
            }

        case USERS_FETCH_ERROR:
            return {
                ...state,
                status:        action.status,
                isFetching:    false,
                didInvalidate: false,
            }

        case INVALIDATE_USERS:
            return {
                ...state,
                didInvalidate: true,
            }

        default:
            return state
    }
}
