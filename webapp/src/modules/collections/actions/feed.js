import { fetchTime } from '../../../core/actions/actionsHelpers'
import { feed }      from '../api'


export const FETCH_COLLECTION_FEED_REQUEST = 'FETCH_COLLECTION_FEED_REQUEST'
export const FETCH_COLLECTION_FEED_SUCCESS = 'FETCH_COLLECTION_FEED_SUCCESS'
export const FETCH_COLLECTION_FEED_FAILURE = 'FETCH_COLLECTION_FEED_FAILURE'
export const INVALIDATE_COLLECTION_FEED    = 'INVALIDATE_COLLECTION_FEED'

export const fetchCollectionFeed = (id, _options = {}) => (dispatch, getState) => {
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

    dispatch({ type: FETCH_COLLECTION_FEED_REQUEST, id, ...options })

    return feed(token, id, options)
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_COLLECTION_FEED_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_COLLECTION_FEED_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateCollectionFeed = id => ({ type: INVALIDATE_COLLECTION_FEED, id })
