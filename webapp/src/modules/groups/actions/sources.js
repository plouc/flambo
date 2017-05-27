import api                      from '@flambo/api-client'
import { fetchTime }            from '../../../core/actions/actionsHelpers'
import { apiBaseUrl as apiUrl } from '../../../core/api'


export const FETCH_GROUP_SOURCES_REQUEST = 'FETCH_GROUP_SOURCES_REQUEST'
export const FETCH_GROUP_SOURCES_SUCCESS = 'FETCH_GROUP_SOURCES_SUCCESS'
export const FETCH_GROUP_SOURCES_FAILURE = 'FETCH_GROUP_SOURCES_FAILURE'
export const INVALIDATE_GROUP_SOURCES    = 'INVALIDATE_GROUP_SOURCES'

export const fetchGroupSources = (id, _options = {}) => (dispatch, getState) => {
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

    dispatch({ type: FETCH_GROUP_SOURCES_REQUEST, id, ...options })

    return api.groups.sources(id, options, { apiUrl, token })
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_GROUP_SOURCES_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_GROUP_SOURCES_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateGroupSources = id => ({ type: INVALIDATE_GROUP_SOURCES, id })
