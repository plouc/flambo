import api           from '@flambo/api-client'
import { fetchTime } from '../../../core/actions/actionsHelpers'


export const FETCH_GROUP_COMMENTS_REQUEST = 'FETCH_GROUP_COMMENTS_REQUEST'
export const FETCH_GROUP_COMMENTS_SUCCESS = 'FETCH_GROUP_COMMENTS_SUCCESS'
export const FETCH_GROUP_COMMENTS_FAILURE = 'FETCH_GROUP_COMMENTS_FAILURE'
export const INVALIDATE_GROUP_COMMENTS    = 'INVALIDATE_GROUP_COMMENTS'

export const fetchGroupComments = (id, _options = {}) => (dispatch, getState) => {
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

    dispatch({ type: FETCH_GROUP_COMMENTS_REQUEST, id, ...options })

    return api.groups.comments(id, options, { token })
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_GROUP_COMMENTS_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_GROUP_COMMENTS_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateGroupComments = id => ({ type: INVALIDATE_GROUP_COMMENTS, id })
