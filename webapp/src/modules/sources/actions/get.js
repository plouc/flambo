import { fetchItemIfNeeded } from '../../../core/actions/actionsHelpers'
import { get }               from '../api'


export const FETCH_SOURCE_REQUEST = 'FETCH_SOURCE_REQUEST'
export const FETCH_SOURCE_SUCCESS = 'FETCH_SOURCE_SUCCESS'
export const FETCH_SOURCE_FAILURE = 'FETCH_SOURCE_FAILURE'
export const INVALIDATE_SOURCE    = 'INVALIDATE_SOURCE'

export const fetchSource = id => dispatch => {
    dispatch({ type: FETCH_SOURCE_REQUEST, id })

    return get(id)
        .then(data => {
            dispatch({ type: FETCH_SOURCE_SUCCESS, id, data })
        })
        .catch(error => {
            dispatch({ type: FETCH_SOURCE_FAILURE, id, error })
        })
}

export const fetchSourceIfNeeded = fetchItemIfNeeded('sources', fetchSource)

export const invalidateSource = id => ({ type: INVALIDATE_SOURCE, id })
