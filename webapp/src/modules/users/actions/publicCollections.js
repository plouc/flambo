import { fetchTime }         from '../../../core/actions/actionsHelpers'
import { publicCollections } from '../api'


export const FETCH_USER_PUBLIC_COLLECTIONS_REQUEST = 'FETCH_USER_PUBLIC_COLLECTIONS_REQUEST'
export const FETCH_USER_PUBLIC_COLLECTIONS_SUCCESS = 'FETCH_USER_PUBLIC_COLLECTIONS_SUCCESS'
export const FETCH_USER_PUBLIC_COLLECTIONS_FAILURE = 'FETCH_USER_PUBLIC_COLLECTIONS_FAILURE'
export const INVALIDATE_USER_PUBLIC_COLLECTIONS    = 'INVALIDATE_USER_PUBLIC_COLLECTIONS'

export const fetchUserPublicCollections = (id, _options = {}) => (dispatch, getState) => {
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
        type: FETCH_USER_PUBLIC_COLLECTIONS_REQUEST,
        id,
        ...options,
    })

    return publicCollections(token, id, options)
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_USER_PUBLIC_COLLECTIONS_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_USER_PUBLIC_COLLECTIONS_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateUserPublicCollections = id => ({
    type: INVALIDATE_USER_PUBLIC_COLLECTIONS,
    id,
})
