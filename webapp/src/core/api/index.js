import URLSearchParams from 'url-search-params'

import {
    namedError,
    isNamedError,
    UNDEFINED_ERROR,
    VALIDATION_ERROR,
    ENTITY_NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    SERVICE_UNAVAILABLE_ERROR,
    UNAUTHORIZED_ERROR,
} from '../errors'

export * from './caller'

export const apiBaseUrl              = process.env.REACT_APP_API_URL

export const API_PAGINATION_PAGE     = 'page'
export const API_PAGINATION_PER_PAGE = 'per_page'
export const API_SORT                = 'sort'

export const commonHeaders           = {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
}

export const mapSort = (sort, mapping) => {
    let mapped = {}
    Object.keys(mapping).forEach(key => {
        const match = sort[key]
        if (match !== undefined) {
            mapped = {
                ...mapped,
                ...mapping[key](match),
            }
        }
    })

    return mapped
}

const interceptApiError = (status, errorContext = {}, data = {}) => {
    if ([200, 201].includes(status)) return data

    const errorData = {
        ...errorContext,
        ...data,
    }

    if (status === 400) {
        return Promise.reject(namedError(
            VALIDATION_ERROR,
            'validation_failed',
            { details: data.errors }
        ))
    }

    if (status === 401) {
        return Promise.reject(namedError(
            UNAUTHORIZED_ERROR,
            'unauthorized'
        ))
    }


    if (status === 404) {
        return Promise.reject(namedError(
            ENTITY_NOT_FOUND,
            'not_found_error',
            errorData
        ))
    }

    if (status === 500) {
        return Promise.reject(namedError(
            INTERNAL_SERVER_ERROR,
            'internal_server_error',
            errorData
        ))
    }

    if (status === 503) {
        return Promise.reject(namedError(
            SERVICE_UNAVAILABLE_ERROR,
            'service_unavailable_error',
            errorData
        ))
    }

    return Promise.reject(namedError(
        UNDEFINED_ERROR,
        'undefined_error',
        errorData
    ))
}

/**
 * Check API response and convert errors if required.
 * `errorContext` can be used to add meta on errors,
 * a common use case is to provide current involved entity
 * to add it in error messages.
 *
 * @param {Object} errorContext - Meta to pass to errors
 */
export const checkApiResponse = (errorContext = {}) => response => {
    const { status } = response

    return response.json()
        .then(data => interceptApiError(status, errorContext, data))
        .catch(error => {
            if (!isNamedError(error)) return interceptApiError(status, errorContext, error)
            return Promise.reject(error)
        })
}

export const checkApiCall = (errorContext = {}) => apiCall => {
    return apiCall
        .catch(() => interceptApiError(undefined, errorContext))
        .then(checkApiResponse(errorContext))
}

/**
 * Build query string from parameters
 * @param {number}   page
 * @param {number}   perPage
 * @param {object}   sort
 * @param {function} [mapSort]
 * @returns {string}
 */
export const buildApiCollectionQuery = ({ page, perPage, sort = {} }, mapSort) => {
    const query = new URLSearchParams()

    if (perPage !== undefined) {
        query.append(API_PAGINATION_PER_PAGE, perPage)
    }
    if (page !== undefined) {
        query.append(API_PAGINATION_PAGE, page)
    }

    if (Object.keys(sort).length) {
        if (mapSort) {
            sort = mapSort(sort)
        }
        let sortQuery = ''
        Object.keys(sort).forEach(key => {
            sortQuery = `${sortQuery}${sort[key] === 'desc' ? '-' : ''}${key}`
        })
        query.append(API_SORT, sortQuery)
    }

    return query.toString()
}