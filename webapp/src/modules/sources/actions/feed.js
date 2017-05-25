import api           from '@flambo/api-client'
import { fetchTime } from '../../../core/actions/actionsHelpers'


export const FETCH_SOURCE_FEED_REQUEST = 'FETCH_SOURCE_FEED_REQUEST'
export const FETCH_SOURCE_FEED_SUCCESS = 'FETCH_SOURCE_FEED_SUCCESS'
export const FETCH_SOURCE_FEED_FAILURE = 'FETCH_SOURCE_FEED_FAILURE'
export const INVALIDATE_SOURCE_FEED    = 'INVALIDATE_SOURCE_FEED'

export const fetchSourceFeed = (id, _options = {}) => (dispatch, getState) => {
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

    dispatch({ type: FETCH_SOURCE_FEED_REQUEST, id, ...options })

    return api.sources.feed(id, options, { token })
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_SOURCE_FEED_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_SOURCE_FEED_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateSourceFeed = id => ({ type: INVALIDATE_SOURCE_FEED, id })
