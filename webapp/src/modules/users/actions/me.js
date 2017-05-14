import { fetchItemIfNeeded } from '../../../core/actions/actionsHelpers'
import { getMe }             from '../api'


export const FETCH_ME_REQUEST = 'FETCH_ME_REQUEST'
export const FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS'
export const FETCH_ME_FAILURE = 'FETCH_ME_FAILURE'
export const INVALIDATE_ME    = 'INVALIDATE_ME'

export const fetchMe = () => (dispatch, getState) => {
    dispatch({ type: FETCH_ME_REQUEST })

    const { auth: { token } } = getState()

    return getMe(token)
        .then(data => {
            dispatch({ type: FETCH_ME_SUCCESS, data })
        })
        .catch(error => {
            dispatch({ type: FETCH_ME_FAILURE, error })
        })
}

export const fetchMeIfNeeded = fetchItemIfNeeded('users', fetchMe)

export const invalidateMe = () => ({ type: INVALIDATE_ME })
