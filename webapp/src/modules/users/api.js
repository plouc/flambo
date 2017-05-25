import URLSearchParams     from 'url-search-params'

import {
    apiBaseUrl,
    API_PAGINATION_PAGE,
    API_PAGINATION_PER_PAGE,
    API_PAGINATION_FIRST,
    API_PAGINATION_AFTER,
    checkApiResponse,
    apiGet,
} from '../../core/api'


const endpoint = `${apiBaseUrl}/users`

export const list = (token, { first, after }) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_FIRST, first)
    if (after !== undefined) {
        query.append(API_PAGINATION_AFTER, after)
    }

    return apiGet(`${endpoint}?${query}`, { token })
        .then(checkApiResponse())
}

export const getMe = token => {
    return apiGet(`${endpoint}/me`, { token })
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
