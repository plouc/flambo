import api                      from '@flambo/api-client'
import { fetchItemIfNeeded }    from '../../../core/actions/actionsHelpers'
import { apiBaseUrl as apiUrl } from '../../../core/api'


export const FETCH_SOURCE_REQUEST = 'FETCH_SOURCE_REQUEST'
export const FETCH_SOURCE_SUCCESS = 'FETCH_SOURCE_SUCCESS'
export const FETCH_SOURCE_FAILURE = 'FETCH_SOURCE_FAILURE'
export const INVALIDATE_SOURCE    = 'INVALIDATE_SOURCE'

export const fetchSource = id => (dispatch, getState) => {
    dispatch({ type: FETCH_SOURCE_REQUEST, id })

    const { auth: { token } } = getState()

    return api.sources.get(id, { apiUrl, token })
        .then(data => {
            dispatch({ type: FETCH_SOURCE_SUCCESS, id, data })
        })
        .catch(error => {
            dispatch({ type: FETCH_SOURCE_FAILURE, id, error })
        })
}

export const fetchSourceIfNeeded = fetchItemIfNeeded('sources', fetchSource)

export const invalidateSource = id => ({ type: INVALIDATE_SOURCE, id })
