import { fetchTime } from '../../../core/actions/actionsHelpers'
import { comments }  from '../api'


export const FETCH_USER_COMMENTS_REQUEST = 'FETCH_USER_COMMENTS_REQUEST'
export const FETCH_USER_COMMENTS_SUCCESS = 'FETCH_USER_COMMENTS_SUCCESS'
export const FETCH_USER_COMMENTS_FAILURE = 'FETCH_USER_COMMENTS_FAILURE'
export const INVALIDATE_USER_COMMENTS    = 'INVALIDATE_USER_COMMENTS'

export const fetchUserComments = (id, _options = {}) => (dispatch, getState) => {
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

    dispatch({ type: FETCH_USER_COMMENTS_REQUEST, id, ...options })

    return comments(token, id, options)
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_USER_COMMENTS_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_USER_COMMENTS_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateUserComments = id => ({ type: INVALIDATE_USER_COMMENTS, id })
