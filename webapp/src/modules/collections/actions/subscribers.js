import api             from '@flambo/api-client'
import { fetchTime }   from '../../../core/actions/actionsHelpers'


export const FETCH_COLLECTION_SUBSCRIBERS_REQUEST = 'FETCH_COLLECTION_SUBSCRIBERS_REQUEST'
export const FETCH_COLLECTION_SUBSCRIBERS_SUCCESS = 'FETCH_COLLECTION_SUBSCRIBERS_SUCCESS'
export const FETCH_COLLECTION_SUBSCRIBERS_FAILURE = 'FETCH_COLLECTION_SUBSCRIBERS_FAILURE'
export const INVALIDATE_COLLECTION_SUBSCRIBERS    = 'INVALIDATE_COLLECTION_SUBSCRIBERS'

export const fetchCollectionSubscribers = (id, _options = {}) => (dispatch, getState) => {
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

    dispatch({ type: FETCH_COLLECTION_SUBSCRIBERS_REQUEST, id, ...options })

    return api.collections.subscribers(id, options, { token })
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_COLLECTION_SUBSCRIBERS_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_COLLECTION_SUBSCRIBERS_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateCollectionSubscribers = id => ({ type: INVALIDATE_COLLECTION_SUBSCRIBERS, id })
