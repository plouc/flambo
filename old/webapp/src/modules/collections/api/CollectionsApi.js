/**
 * @module collections/api/CollectionsApi
 */
'use strict'

import { doneHandler, failureHandler } from '../../../lib/api/apiHandlers'

const BASE_URL = 'http://localhost:3000/api/v1'


/**
 * Lists collections.
 *
 * @method
 * @param {string} token - The JWT token
 * @returns {Promise.<Array, Error>}
 */
export const list = token => {
    return fetch(`${BASE_URL}/collections`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}


/**
 * Gets a collection by its id.
 *
 * @method
 * @param {string} token - The JWT token
 * @param {string} id    - The collection id
 * @returns {Promise.<Collection, Error>}
 */
export const get = (token, id) => {
    return fetch(`${BASE_URL}/collections/${id}`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}


/**
 * Lists collection news items.
 *
 * @method
 * @param {string} token - The JWT token
 * @param {string} id    - The collection id
 * @returns {Promise.<Array, Error>}
 */
export const getCollectionNewsItems = (token, id, { limit = 10, page = 1, filters = {} }) => {
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

    return fetch(`${BASE_URL}/collections/${id}/news_items?${query.join('&')}`, {
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


export const getCollectionNewsItemsStats = (token, id, filters = {}) => {
    const query = []
    if (filters.sourceType && Array.isArray(filters.sourceType)) {
        filters.sourceType.forEach(sourceType => {
            query.push(`sourceType=${sourceType}`)
        })
    }

    return fetch(`${BASE_URL}/collections/${id}/news_items/stats?${query.join('&')}`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}


export const addNewsItem = (id, newsItemId) => {
    return fetch(`${BASE_URL}/collections/${id}/add/${newsItemId}`, {
        method:  'PUT',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(doneHandler, failureHandler)
}


export const removeNewsItem = (id, newsItemId) => {
    return fetch(`${BASE_URL}/collections/${id}/remove/${newsItemId}`, {
        method:  'PUT',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(doneHandler, failureHandler)
}

