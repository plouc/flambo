import URLSearchParams     from 'url-search-params'

//import * as dto            from './dto'
import {
    apiBaseUrl,
    API_PAGINATION_PAGE,
    API_PAGINATION_PER_PAGE,
    API_SORT,
    checkApiResponse,
    apiGet,
    apiPut,
    apiPost,
} from '../../core/api'

const groupsApiEndpoint = `${apiBaseUrl}/groups`

export function list({ perPage, page, sort: _sort = {}, filters: _filters = {} }) {
    const query = new URLSearchParams()

    query.append(API_PAGINATION_PER_PAGE, perPage)
    query.append(API_PAGINATION_PAGE,     page)

    /*
    const sort    = dto.sort(_sort)
    let sortQuery = ''
    Object.keys(sort).forEach(key => {
        sortQuery = `${sortQuery}${sort[key] === 'desc' ? '-' : ''}${key}`
    })
    query.append(API_SORT, sortQuery)

    const filters = dto.filters(_filters)
    Object.keys(filters).forEach(key => {
        query.append(key, filters[key])
    })
    */

    return apiGet(query ? `${groupsApiEndpoint}?${query}` : groupsApiEndpoint)
        .then(checkApiResponse())
}
