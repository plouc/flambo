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


const endpoint = `${apiBaseUrl}/sources`

export const load = (token, id) => {
    return apiPost(`${endpoint}/${id}/load`, { token })
        .then(checkApiResponse({ id, entity: 'source' }))
}

export const create = (token, data) => {
    return apiPost(endpoint, { token, data })
        .then(checkApiResponse())
}

export function update(token, id, data) {
    return apiPut(`${endpoint}/${id}`, { token, data })
        .then(checkApiResponse({ id, entity: 'source' }))
}

export const jobs = (token, id, { perPage, page, sort: _sort = {}, filters: _filters = {} }) => {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    const jobsEndpoint = `${endpoint}/${id}/jobs`

    return apiGet(query ? `${jobsEndpoint}?${query}` : jobsEndpoint, { token })
        .then(checkApiResponse())
}

