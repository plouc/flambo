/**
 * @module sources/api/SourcesApi
 */
'use strict'

import { doneHandler, failureHandler } from '../../../lib/api/apiHandlers'

const BASE_URL = 'http://localhost:3000/api/v1'


/**
 * Lists sources.
 *
 * @method
 * @returns {Promise.<Array, Error>}
 */
export const list = () => {
    return fetch(`${BASE_URL}/sources`, {
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(doneHandler, failureHandler)
}

/**
 * Gets a source by its id.
 *
 * @method
 * @param {string} id - The source id
 * @returns {Promise.<Source, Error>}
 */
export const get = id => {
    return fetch(`${BASE_URL}/sources/${id}`, {
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(doneHandler, failureHandler)
}

export const collect = id => {
    return fetch(`${BASE_URL}/sources/${id}/collect`, {
        method:  'POST',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(doneHandler, failureHandler)
}

/**
 * Lists source news items.
 *
 * @method
 * @param {string} id - The source id
 * @returns {Promise.<Array, Error>}
 */
export const getSourceNewsItems = (id, { limit = 10, page = 1, filters = {} }) => {
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
            'Accept': 'application/json',
        },
    })
    .then(doneHandler, failureHandler)
    .then(newsItems => ({
        newsItems,
        total: parseInt(res.headers.get('X-Total'), 10),
        limit: parseInt(res.headers.get('X-Limit',  10)),
        page:  parseInt(res.headers.get('X-Page',   10)),
    }))
}

export const update = (id, source) => {
    const result = {
        hasError: false,
        errors:   [],
        source:   null,
    }

    return fetch(`${BASE_URL}/sources/${id}`, {
        method:  'PUT',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(source),
    })
    .then(res => {
        result.hasError = res.status === 400
        return res.json()
    })
    .then(source => {
        if (source.errors) {
            result.errors = source.errors
        } else {
            result.source = source
        }

        return result
    })
    .catch(err => {
        console.error(err)
    })
}
