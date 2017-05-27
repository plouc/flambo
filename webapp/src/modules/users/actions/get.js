import api                      from '@flambo/api-client'
import { fetchItemIfNeeded }    from '../../../core/actions/actionsHelpers'
import { apiBaseUrl as apiUrl } from '../../../core/api'


export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'
export const INVALIDATE_USER    = 'INVALIDATE_USER'

export const fetchUser = id => (dispatch, getState) => {
    dispatch({ type: FETCH_USER_REQUEST, id })

    const { auth: { token } } = getState()

    return api.users.get(id, { apiUrl, token })
        .then(data => {
            dispatch({ type: FETCH_USER_SUCCESS, id, data })
        })
        .catch(error => {
            dispatch({ type: FETCH_USER_FAILURE, id, error })
        })
}

export const fetchUserIfNeeded = fetchItemIfNeeded('users', fetchUser)

export const invalidateUser = id => ({ type: INVALIDATE_USER, id })
