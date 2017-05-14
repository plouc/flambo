import { fetchTime }                from '../../../core/actions/actionsHelpers'
import { collectionsSubscriptions } from '../api'


export const FETCH_USER_COLLECTIONS_SUBSCRIPTIONS_REQUEST = 'FETCH_USER_COLLECTIONS_SUBSCRIPTIONS_REQUEST'
export const FETCH_USER_COLLECTIONS_SUBSCRIPTIONS_SUCCESS = 'FETCH_USER_COLLECTIONS_SUBSCRIPTIONS_SUCCESS'
export const FETCH_USER_COLLECTIONS_SUBSCRIPTIONS_FAILURE = 'FETCH_USER_COLLECTIONS_SUBSCRIPTIONS_FAILURE'
export const INVALIDATE_USER_COLLECTIONS_SUBSCRIPTIONS    = 'INVALIDATE_USER_COLLECTIONS_SUBSCRIPTIONS'

export const fetchUserCollectionsSubscriptions = (id, _options = {}) => (dispatch, getState) => {
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

    dispatch({
        type: FETCH_USER_COLLECTIONS_SUBSCRIPTIONS_REQUEST,
        id,
        ...options,
    })

    return collectionsSubscriptions(token, id, options)
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_USER_COLLECTIONS_SUBSCRIPTIONS_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_USER_COLLECTIONS_SUBSCRIPTIONS_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateUserCollectionsSubscriptions = id => ({
    type: INVALIDATE_USER_COLLECTIONS_SUBSCRIPTIONS,
    id,
})
