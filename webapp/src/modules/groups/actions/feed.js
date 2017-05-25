import api           from '@flambo/api-client'
import { fetchTime } from '../../../core/actions/actionsHelpers'


export const FETCH_GROUP_FEED_REQUEST = 'FETCH_GROUP_FEED_REQUEST'
export const FETCH_GROUP_FEED_SUCCESS = 'FETCH_GROUP_FEED_SUCCESS'
export const FETCH_GROUP_FEED_FAILURE = 'FETCH_GROUP_FEED_FAILURE'
export const INVALIDATE_GROUP_FEED    = 'INVALIDATE_GROUP_FEED'

export const fetchGroupFeed = (id, _options = {}) => (dispatch, getState) => {
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

    dispatch({ type: FETCH_GROUP_FEED_REQUEST, id, ...options })

    return api.groups.feed(id, options, { token })
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_GROUP_FEED_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_GROUP_FEED_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateGroupFeed = id => ({ type: INVALIDATE_GROUP_FEED, id })
