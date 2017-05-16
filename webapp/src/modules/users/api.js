import URLSearchParams     from 'url-search-params'

import {
    apiBaseUrl,
    API_PAGINATION_PAGE,
    API_PAGINATION_PER_PAGE,
    API_PAGINATION_OFFSET,
    API_PAGINATION_LIMIT,
    checkApiResponse,
    apiGet,
} from '../../core/api'


const endpoint = `${apiBaseUrl}/users`

export const list = (token, { offset, limit, sort: _sort = {}, filters: _filters = {} }) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_OFFSET, offset)
    query.append(API_PAGINATION_LIMIT,  limit)

    return apiGet(`${endpoint}?${query}`, { token })
        .then(checkApiResponse())
}

export const get = (token, id) => {
    return apiGet(`${endpoint}/${id}`, { token })
        .then(checkApiResponse({ id, entity: 'user' }))
}

export const getMe = token => {
    return apiGet(`${endpoint}/me`, { token })
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

export const comments = (token, id, { perPage, page, sort: _sort = {}, filters: _filters = {} }) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    const commentsEndpoint = `${endpoint}/${id}/comments`

    return apiGet(query ? `${commentsEndpoint}?${query}` : commentsEndpoint, { token })
        .then(checkApiResponse())
}

export const publicCollections = (token, id, {
    perPage, page, sort: _sort = {}, filters: _filters = {},
}) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    const collectionsEndpoint = `${endpoint}/${id}/collections/public`

    return apiGet(query ? `${collectionsEndpoint}?${query}` : collectionsEndpoint, { token })
        .then(checkApiResponse())
}

export const collectionsSubscriptions = (token, id, {
    perPage, page, sort: _sort = {}, filters: _filters = {},
}) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    const collectionsEndpoint = `${endpoint}/${id}/collections/subscriptions`

    return apiGet(query ? `${collectionsEndpoint}?${query}` : collectionsEndpoint, { token })
        .then(checkApiResponse())
}
