/**
 * @module sources/api/SourcesApi
 */
'use strict'

import _                               from 'lodash'
import { doneHandler, failureHandler } from '../../../lib/api/apiHandlers'

const BASE_URL = 'http://localhost:3000/api/v1'


/**
 * Lists sources.
 *
 * @method
 * @param {string} token - The JWT token
 * @returns {Promise.<Array, Error>}
 */
export const list = token => {
    return fetch(`${BASE_URL}/sources`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}


/**
 * Gets a source by its id.
 *
 * @method
 * @param {string} token - The JWT token
 * @param {string} id    - The source id
 * @returns {Promise.<Source, Error>}
 */
export const get = (token, id) => {
    return fetch(`${BASE_URL}/sources/${id}`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}


export const collect = (token, id) => {
    return fetch(`${BASE_URL}/sources/${id}/collect`, {
        method:  'POST',
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}


/**
 * Lists source news items.
 *
 * @method
 * @param {string} token - The JWT token
 * @param {string} id    - The source id
 * @returns {Promise.<Array, Error>}
 */
export const getSourceNewsItems = (token, id, { limit = 10, page = 1, filters = {} }) => {
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

    return fetch(`${BASE_URL}/sources/${id}/news_items?${query.join('&')}`, {
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


export const getSourceNewsItemsStats = (token, id, filters = {}) => {
    const query = []
    if (filters.sourceType && Array.isArray(filters.sourceType)) {
        filters.sourceType.forEach(sourceType => {
            query.push(`sourceType=${sourceType}`)
        })
    }

    return fetch(`${BASE_URL}/sources/${id}/news_items/stats?${query.join('&')}`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}


/**
 * Creates a source.
 *
 * @param {string} token  - The topic JWT token
 * @param {Object} source - The source data
 * @returns {Promise.<*>}
 */
export const create = (token, source) => {
    let res

    return fetch(`${BASE_URL}/sources`, {
        method:  'POST',
        headers: {
            'Authorization': `JWT ${token}`,
            'Accept':        'application/json',
            'Content-Type':  'application/json',
        },
        body: JSON.stringify(source),
    })
    .then(_res => {
        res = _res

        return res.json()
    })
    .then(data => {
        if (res.status === 400) {
            const errors = { data: {} }
            data.errors.forEach(error => {
                _.set(errors, error.path, error.message)
            })

            return Promise.reject(errors)
        }

        return data
    })
}


/**
 *
 * @method
 * @param {string} token - The JWT token
 * @param {string} id    - The source id
 * @param {Object} source
 * @returns {Promise.<Object, Error>}
 */
export const update = (token, id, source) => {
    let res

    return fetch(`${BASE_URL}/sources/${id}`, {
        method:  'PUT',
        headers: {
            'Authorization': `JWT ${token}`,
            'Accept':        'application/json',
            'Content-Type':  'application/json',
        },
        body: JSON.stringify(source),
    })
    .then(_res => {
        res = _res

        return res.json()
    })
    .then(data => {
        if (res.status === 400) {
            const errors = { data: {} }
            data.errors.forEach(error => {
                _.set(errors, error.path, error.message)
            })

            return Promise.reject(errors)
        }

        return data
    })
}