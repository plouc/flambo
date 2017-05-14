import URLSearchParams from 'url-search-params'

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


const endpoint = `${apiBaseUrl}/groups`

export const list = (token, { perPage, page, sort: _sort = {}, filters: _filters = {} }) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    return apiGet(query ? `${endpoint}?${query}` : endpoint, { token })
        .then(checkApiResponse())
}

export const get = (token, id) => {
    return apiGet(`${endpoint}/${id}`, { token })
        .then(checkApiResponse({ id, entity: 'group' }))
}

export const create = (token, data) => {
    return apiPost(endpoint, { token, data })
        .then(checkApiResponse({ entity: 'group' }))
}

export const update = (token, id, data) => {
    return apiPut(`${endpoint}/${id}`, { token, data })
        .then(checkApiResponse({ id, entity: 'group' }))
}

export const join = (token, id) => {
    return apiPost(`${endpoint}/${id}/membership`, { token })
        .then(checkApiResponse())
}

export const leave = (token, id) => {
    return apiDelete(`${endpoint}/${id}/membership`, { token })
        .then(checkApiResponse())
}

export const feed = (token, id, {
    perPage, page, sort: _sort = {}, filters: _filters = {},
}) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    const feedEndpoint = `${endpoint}/${id}/feed`

    return apiGet(query ? `${feedEndpoint}?${query}` : feedEndpoint, { token })
        .then(checkApiResponse())
}

export const members = (token, id, {
    perPage, page, sort: _sort = {}, filters: _filters = {},
}) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    const membersEndpoint = `${endpoint}/${id}/members`

    return apiGet(query ? `${membersEndpoint}?${query}` : membersEndpoint, { token })
        .then(checkApiResponse())
}

export const sources = (token, id, {
    perPage, page, sort: _sort = {}, filters: _filters = {},
}) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    const sourcesEndpoint = `${endpoint}/${id}/sources`

    return apiGet(query ? `${sourcesEndpoint}?${query}` : sourcesEndpoint, { token })
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
