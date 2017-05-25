import api           from '@flambo/api-client'
import { fetchTime } from '../../../core/actions/actionsHelpers'


export const FETCH_USER_FEED_REQUEST = 'FETCH_USER_FEED_REQUEST'
export const FETCH_USER_FEED_SUCCESS = 'FETCH_USER_FEED_SUCCESS'
export const FETCH_USER_FEED_FAILURE = 'FETCH_USER_FEED_FAILURE'
export const INVALIDATE_USER_FEED    = 'INVALIDATE_USER_FEED'

export const fetchUserFeed = (id, _options = {}) => (dispatch, getState) => {
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

    dispatch({ type: FETCH_USER_FEED_REQUEST, id, ...options })

    return api.users.feed(id, options, { token })
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_USER_FEED_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_USER_FEED_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateUserFeed = id => ({ type: INVALIDATE_USER_FEED, id })
