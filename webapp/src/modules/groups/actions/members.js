import api                      from '@flambo/api-client'
import { fetchTime }            from '../../../core/actions/actionsHelpers'
import { apiBaseUrl as apiUrl } from '../../../core/api'


export const FETCH_GROUP_MEMBERS_REQUEST = 'FETCH_GROUP_MEMBERS_REQUEST'
export const FETCH_GROUP_MEMBERS_SUCCESS = 'FETCH_GROUP_MEMBERS_SUCCESS'
export const FETCH_GROUP_MEMBERS_FAILURE = 'FETCH_GROUP_MEMBERS_FAILURE'
export const INVALIDATE_GROUP_MEMBERS    = 'INVALIDATE_GROUP_MEMBERS'

export const fetchGroupMembers = (id, _options = {}) => (dispatch, getState) => {
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

    dispatch({ type: FETCH_GROUP_MEMBERS_REQUEST, id, ...options })

    return api.groups.members(id, options, { apiUrl, token })
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_GROUP_MEMBERS_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_GROUP_MEMBERS_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateGroupMembers = id => ({ type: INVALIDATE_GROUP_MEMBERS, id })
