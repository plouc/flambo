import URLSearchParams     from 'url-search-params'

import {
    apiBaseUrl,
    API_PAGINATION_PAGE,
    API_PAGINATION_PER_PAGE,
    checkApiResponse,
    apiGet,
} from '../../core/api'


const endpoint = `${apiBaseUrl}/users`

export function list({ perPage, page, sort: _sort = {}, filters: _filters = {} }) {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    return apiGet(query ? `${endpoint}?${query}` : endpoint)
        .then(checkApiResponse())
}

export const get = id => {
    return apiGet(`${endpoint}/${id}`)
        .then(checkApiResponse({ id, entity: 'user' }))
}
