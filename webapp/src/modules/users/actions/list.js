import isEqual       from 'lodash/isEqual'

import { list }      from '../api'
import { fetchTime } from '../../../core/actions/actionsHelpers'


export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'
export const INVALIDATE_USERS    = 'INVALIDATE_USERS'

export const fetchUsers = () => (dispatch, getState) => {
    const {
        users: { didInvalidate, first, endCursor },
        auth:  { token },
    } = getState()

    const options = { first }
    if (!didInvalidate && endCursor !== null) {
        options.after = endCursor
    }

    dispatch({ type: FETCH_USERS_REQUEST, ...options })

    return list(token, options)
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_USERS_SUCCESS,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_USERS_FAILURE,
                error,
            })
        })
}

const shouldFetchUsers = (
    { users: { isFetching, didInvalidate, sort, filters } },
    options = {},
) => {
    if (isFetching) return false

    return true
    if (options.sort    !== undefined && !isEqual(options.sort, sort))       return true
    if (options.filters !== undefined && !isEqual(options.filters, filters)) return true

    return didInvalidate
}

export const fetchUsersIfNeeded = (options = {}) => (dispatch, getState) => {
    if (shouldFetchUsers(getState(), options)) {
        return dispatch(fetchUsers(options))
    }
    
    return Promise.resolve()
}

export const invalidateUsers = () => ({ type: INVALIDATE_USERS })
