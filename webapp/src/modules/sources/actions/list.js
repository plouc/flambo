import isEqual       from 'lodash/isEqual'

import { list }      from '../api'
import { fetchTime } from '../../../core/actions/actionsHelpers'


export const FETCH_SOURCES_REQUEST = 'FETCH_SOURCES_REQUEST'
export const FETCH_SOURCES_SUCCESS = 'FETCH_SOURCES_SUCCESS'
export const FETCH_SOURCES_FAILURE = 'FETCH_SOURCES_FAILURE'
export const INVALIDATE_SOURCES    = 'INVALIDATE_SOURCES'

export const fetchSources = (_options = {}) => (dispatch, getState) => {
    const {
        sources: { perPage, page, sort, filters },
        auth:    { token },
    } = getState()

    const options = {
        perPage,
        page,
        sort,
        filters,
        ..._options,
    }

    dispatch({
        type: FETCH_SOURCES_REQUEST,
        ...options,
    })

    return list(token, options)
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_SOURCES_SUCCESS,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_SOURCES_FAILURE,
                error,
            })
        })
}

const shouldFetchSources = (
    { sources: { isFetching, didInvalidate, perPage, page, sort, filters } },
    options = {},
) => {
    if (isFetching) return false

    if (options.perPage !== undefined && options.perPage !== perPage)        return true
    if (options.page    !== undefined && options.page    !== page)           return true
    if (options.sort    !== undefined && !isEqual(options.sort, sort))       return true
    if (options.filters !== undefined && !isEqual(options.filters, filters)) return true

    return didInvalidate
}

export const fetchSourcesIfNeeded = (options = {}) => (dispatch, getState) => {
    if (shouldFetchSources(getState(), options)) {
        return dispatch(fetchSources(options))
    }
    
    return Promise.resolve()
}

export const invalidateSources = () => ({ type: INVALIDATE_SOURCES })
