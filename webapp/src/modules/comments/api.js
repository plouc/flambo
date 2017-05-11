import URLSearchParams     from 'url-search-params'

import {
    apiBaseUrl,
    API_PAGINATION_PAGE,
    API_PAGINATION_PER_PAGE,
    checkApiResponse,
    apiGet,
    apiPost,
    apiPut,
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
