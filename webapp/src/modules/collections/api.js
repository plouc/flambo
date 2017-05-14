import URLSearchParams     from 'url-search-params'

import {
    apiBaseUrl,
    API_PAGINATION_PAGE,
    API_PAGINATION_PER_PAGE,
    checkApiResponse,
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
} from '../../core/api'


const endpoint = `${apiBaseUrl}/collections`

export const list = (token, { perPage, page, sort: _sort = {}, filters: _filters = {} }) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    return apiGet(query ? `${endpoint}?${query}` : endpoint, { token })
        .then(checkApiResponse())
}

export const get = (token, id) => {
    return apiGet(`${endpoint}/${id}`, { token })
        .then(checkApiResponse({ id, entity: 'collection' }))
}

export const create = (token, data) => {
    return apiPost(endpoint, { token, data })
        .then(checkApiResponse({ entity: 'collection' }))
}

export const update = (token, id, data) => {
    return apiPut(`${endpoint}/${id}`, { token, data })
        .then(checkApiResponse({ id, entity: 'collection' }))
}

export const subscribe = (token, id) => {
    return apiPost(`${endpoint}/${id}/subscription`, { token })
        .then(checkApiResponse())
}

export const unsubscribe = (token, id) => {
    return apiDelete(`${endpoint}/${id}/subscription`, { token })
        .then(checkApiResponse())
}

export const feed = (token, id, { perPage, page, sort: _sort = {}, filters: _filters = {} }) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    const feedEndpoint = `${endpoint}/${id}/feed`

    return apiGet(query ? `${feedEndpoint}?${query}` : feedEndpoint, { token })
        .then(checkApiResponse())
}

export const comments = (token, id, {
    perPage, page, sort: _sort = {}, filters: _filters = {},
}) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    const commentsEndpoint = `${endpoint}/${id}/comments`

    return apiGet(query ? `${commentsEndpoint}?${query}` : commentsEndpoint, { token })
        .then(checkApiResponse())
}

export const comment = (token, id, data) => {
    const commentsEndpoint = `${endpoint}/${id}/comments`

    return apiPost(commentsEndpoint, { token, data })
        .then(checkApiResponse())
}

export const subscribers = (token, id, { perPage, page, sort: _sort = {}, filters: _filters = {} }) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    const subscribersEndpoint = `${endpoint}/${id}/subscribers`

    return apiGet(query ? `${subscribersEndpoint}?${query}` : subscribersEndpoint, { token })
        .then(checkApiResponse())
}
