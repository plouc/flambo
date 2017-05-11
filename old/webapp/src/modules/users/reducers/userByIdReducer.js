/**
 * @module users/reducers/UserByIdReducer
 */
'use strict'

import { LOGOUT_SUCCESS }  from '../../auth/actions/authActions'
import {
    REQUEST_USER,
    RECEIVE_USER,
    USER_FETCH_ERROR,
} from '../constants/usersActionTypes'


const user = (state = {
    user:          null,
    isFetching:    false,
    didInvalidate: false,
    status:        0,
}, action) => {
    switch (action.type) {
        case REQUEST_USER:
            return {
                ...state,
                isFetching: true,
            }

        case RECEIVE_USER:
            return {
                ...state,
                user:          action.user,
                isFetching:    false,
                didInvalidate: false,
            }

        case USER_FETCH_ERROR:
            return {
                ...state,
                isFetching:    false,
                didInvalidate: false,
                status:        action.status,
            }

        default:
            return state
    }
}


export default function userById(state = {}, action) {
    switch (action.type) {
        case REQUEST_USER:
        case RECEIVE_USER:
        case USER_FETCH_ERROR:
            return {
                ...state,
                [action.userId]: user(state[action.userId], action),
            }

        case LOGOUT_SUCCESS:
            return {}

        default:
            return state
    }
}
