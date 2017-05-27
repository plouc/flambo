import api                      from '@flambo/api-client'
import { fetchTime }            from '../../../core/actions/actionsHelpers'
import { apiBaseUrl as apiUrl } from '../../../core/api'


export const FETCH_GROUPS_REQUEST = 'FETCH_GROUPS_REQUEST'
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS'
export const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE'
export const INVALIDATE_GROUPS    = 'INVALIDATE_GROUPS'

export const fetchGroups = (_options = {}) => (dispatch, getState) => {
    const {
        groups: { perPage, page },
        auth:   { token },
    } = getState()

    const options = {
        perPage,
        page,
        ..._options,
    }

    dispatch({
        type: FETCH_GROUPS_REQUEST,
        ...options,
    })

    return api.groups.find(options, { apiUrl, token })
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_GROUPS_SUCCESS,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_GROUPS_FAILURE,
                error,
            })
        })
}

export const fetchNextGroups = () => (dispatch, getState) => {
    const { groups: { page } } = getState()

    dispatch(fetchGroups({ page: page + 1 }))
}

const shouldFetchGroups = (
    { groups: { isFetching, didInvalidate, perPage, page } },
    options = {},
) => {
    if (isFetching) return false

    if (options.perPage !== undefined && options.perPage !== perPage) return true
    if (options.page    !== undefined && options.page    !== page)    return true

    return didInvalidate
}

export const fetchGroupsIfNeeded = (options = {}) => (dispatch, getState) => {
    if (shouldFetchGroups(getState(), options)) {
        return dispatch(fetchGroups(options))
    }
    
    return Promise.resolve()
}

export const invalidateGroups = () => ({ type: INVALIDATE_GROUPS })
