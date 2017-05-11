import isEqual       from 'lodash/isEqual'

import { list }      from '../api'
import { fetchTime } from '../../../core/actions/actionsHelpers'


export const FETCH_COLLECTIONS_REQUEST = 'FETCH_COLLECTIONS_REQUEST'
export const FETCH_COLLECTIONS_SUCCESS = 'FETCH_COLLECTIONS_SUCCESS'
export const FETCH_COLLECTIONS_FAILURE = 'FETCH_COLLECTIONS_FAILURE'
export const INVALIDATE_COLLECTIONS    = 'INVALIDATE_COLLECTIONS'

export const fetchCollections = (_options = {}) => (dispatch, getState) => {
    const { collections: { perPage, page, sort, filters } } = getState()

    const options = {
        perPage,
        page,
        sort,
        filters,
        ..._options,
    }

    dispatch({
        type: FETCH_COLLECTIONS_REQUEST,
        ...options,
    })

    return list(options)
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_COLLECTIONS_SUCCESS,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_COLLECTIONS_FAILURE,
                error,
            })
        })
}

const shouldFetchCollections = (
    { collections: { isFetching, didInvalidate, perPage, page, sort, filters } },
    options = {},
) => {
    if (isFetching) return false

    if (options.perPage !== undefined && options.perPage !== perPage)        return true
    if (options.page    !== undefined && options.page    !== page)           return true
    if (options.sort    !== undefined && !isEqual(options.sort, sort))       return true
    if (options.filters !== undefined && !isEqual(options.filters, filters)) return true

    return didInvalidate
}

export const fetchCollectionsIfNeeded = (options = {}) => (dispatch, getState) => {
    if (shouldFetchCollections(getState(), options)) {
        return dispatch(fetchCollections(options))
    }
    
    return Promise.resolve()
}

export const invalidateCollections = () => ({ type: INVALIDATE_COLLECTIONS })
