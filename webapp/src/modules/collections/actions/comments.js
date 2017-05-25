import api           from '@flambo/api-client'
import { fetchTime } from '../../../core/actions/actionsHelpers'


export const FETCH_COLLECTION_COMMENTS_REQUEST = 'FETCH_COLLECTION_COMMENTS_REQUEST'
export const FETCH_COLLECTION_COMMENTS_SUCCESS = 'FETCH_COLLECTION_COMMENTS_SUCCESS'
export const FETCH_COLLECTION_COMMENTS_FAILURE = 'FETCH_COLLECTION_COMMENTS_FAILURE'
export const INVALIDATE_COLLECTION_COMMENTS    = 'INVALIDATE_COLLECTION_COMMENTS'

export const fetchCollectionComments = (id, _options = {}) => (dispatch, getState) => {
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

    dispatch({ type: FETCH_COLLECTION_COMMENTS_REQUEST, id, ...options })

    return api.collections.comments(id, options, { token })
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_COLLECTION_COMMENTS_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_COLLECTION_COMMENTS_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateCollectionComments = id => ({ type: INVALIDATE_COLLECTION_COMMENTS, id })
