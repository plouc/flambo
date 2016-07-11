/**
 * @module newsItems/api/NewsItemsApi
 */
'use strict'

const BASE_URL = 'http://localhost:3000/api/v1'


/**
 * Lists news items.
 *
 * @method
 * @returns {Promise.<Array, Error>}
 */
export const list = ({ limit = 10, page = 1, filters = {} }) => {
    let res

    const query = [
        `limit=${limit}`,
        `page=${page}`,
    ]

    if (filters.sourceType && Array.isArray(filters.sourceType)) {
        filters.sourceType.forEach(sourceType => {
            query.push(`sourceType=${sourceType}`)
        })
    }

    console.log(`/news_items?${query.join('&')}`)

    return fetch(`${BASE_URL}/news_items?${query.join('&')}`,
        {
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(_res => {
            res = _res

            return res.json()
        })
        .then(newsItems => ({
            newsItems,
            total: parseInt(res.headers.get('X-Total'), 10),
            limit: parseInt(res.headers.get('X-Limit',  10)),
            page:  parseInt(res.headers.get('X-Page',   10)),
        }))
        .catch(err => {
            console.error(err)
        })
}
