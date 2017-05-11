/**
 * @module newsItems/api/NewsItemsApi
 */
'use strict'

import { doneHandler, failureHandler } from '../../../lib/api/apiHandlers'

const BASE_URL = 'http://localhost:3000/api/v1'


/**
 * Lists news items.
 *
 * @method
 * @param {string} token - The JWT token
 * @returns {Promise.<Array, Error>}
 */
export const list = (token, { limit = 10, page = 1, filters = {} }) => {
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

    return fetch(`${BASE_URL}/news_items?${query.join('&')}`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(_res => res = _res)
    .then(doneHandler, failureHandler)
    .then(newsItems => ({
        newsItems,
        total: parseInt(res.headers.get('X-Total'), 10),
        limit: parseInt(res.headers.get('X-Limit',  10)),
        page:  parseInt(res.headers.get('X-Page',   10)),
    }))
}


/**
 *
 * @param {string} token - The JWT token
 * @param {Object} filters
 * @returns {Promise.<Array, Error>}
 */
export const getStats = (token, filters = {}) => {
    const query = []
    if (filters.sourceType && Array.isArray(filters.sourceType)) {
        filters.sourceType.forEach(sourceType => {
            query.push(`sourceType=${sourceType}`)
        })
    }

    return fetch(`${BASE_URL}/news_items/stats?${query.join('&')}`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}
