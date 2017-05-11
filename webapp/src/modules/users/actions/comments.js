import { fetchTime }   from '../../../core/actions/actionsHelpers'
import { collections } from '../api'


export const FETCH_USER_COLLECTIONS_REQUEST = 'FETCH_USER_COLLECTIONS_REQUEST'
export const FETCH_USER_COLLECTIONS_SUCCESS = 'FETCH_USER_COLLECTIONS_SUCCESS'
export const FETCH_USER_COLLECTIONS_FAILURE = 'FETCH_USER_COLLECTIONS_FAILURE'
export const INVALIDATE_USER_COLLECTIONS    = 'INVALIDATE_USER_COLLECTIONS'

export const fetchUserCollections = (id, _options = {}) => (dispatch, getState) => {
    const {
        collections: { perPage, page, sort, filters },
        auth:        { token },
    } = getState()

    const options = {
        perPage,
        page,
        sort,
        filters,
        ..._options,
    }

    dispatch({ type: FETCH_USER_COLLECTIONS_REQUEST, id, ...options })

    return collections(token, id, options)
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_USER_COLLECTIONS_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_USER_COLLECTIONS_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateUserCollections = id => ({ type: INVALIDATE_USER_COLLECTIONS, id })
