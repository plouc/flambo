/**
 * @module topics/api/TopicsApi
 */
'use strict'

import { doneHandler, failureHandler } from '../../../lib/api/apiHandlers'

const BASE_URL = 'http://localhost:3000/api/v1'


/**
 * Lists topics.
 *
 * @method
 * @returns {Promise.<Array, Error>}
 */
export const list = token => {
    return fetch(`${BASE_URL}/topics`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}

/**
 * Gets a topic by its id.
 *
 * @method
 * @param {string} token - The topic JWT token
 * @param {string} id    - The topic id
 * @returns {Promise.<Topic, Error>}
 */
export const get = (token, id) => {
    return fetch(`${BASE_URL}/topics/${id}`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}

/**
 * Lists topic news items.
 *
 * @method
 * @param {string} token - The topic JWT token
 * @param {string} id    - The topic id
 * @returns {Promise.<Array, Error>}
 */
export const getTopicNewsItems = (token, id, { limit = 10, page = 1, filters = {} }) => {
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

    return fetch(`${BASE_URL}/topics/${id}/news_items?${query.join('&')}`, {
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


export const getTopicNewsItemsStats = (token, id, filters = {}) => {
    const query = []
    if (filters.sourceType && Array.isArray(filters.sourceType)) {
        filters.sourceType.forEach(sourceType => {
            query.push(`sourceType=${sourceType}`)
        })
    }

    return fetch(`${BASE_URL}/topics/${id}/news_items/stats?${query.join('&')}`, {
        headers: {
            'Accept':        'application/json',
            'Authorization': `JWT ${token}`,
        },
    })
    .then(doneHandler, failureHandler)
}


/**
 * Creates a topic.
 *
 * @param {string} token - The topic JWT token
 * @param {Object} topic - The topic data
 * @returns {Promise.<*>}
 */
export const create = (token, topic) => {
    let res

    return fetch(`${BASE_URL}/topics`, {
        method:  'POST',
        headers: {
            'Authorization': `JWT ${token}`,
            'Accept':        'application/json',
            'Content-Type':  'application/json',
        },
        body: JSON.stringify(topic),
    })
    .then(_res => {
        res = _res

        return res.json()
    })
    .then(data => {
        if (res.status === 400) {
            const errors = {}
            data.errors.forEach(error => {
                errors[error.path] = error.message
            })

            return Promise.reject(errors)
        }

        return data
    })
}


export const uploadPicture = (id, file) => {
    console.log('uploadPicture', id, file)

    const data = new FormData()
    data.append('picture', file)

    return fetch(`${BASE_URL}/topics/${id}/picture`, {
        method: 'POST',
        body:   data,
    })
}


/**
 * Updates a topic.
 *
 * @param {string} token - The topic JWT token
 * @param {string} id    - The topic id
 * @param {Object} topic - The topic data
 * @returns {Promise.<*>}
 */
export const update = (token, id, topic) => {
    let res

    return fetch(`${BASE_URL}/topics/${id}`, {
        method:  'PUT',
        headers: {
            'Authorization': `JWT ${token}`,
            'Accept':        'application/json',
            'Content-Type':  'application/json',
        },
        body: JSON.stringify(topic),
    })
    .then(_res => {
        res = _res

        return res.json()
    })
    .then(data => {
        if (res.status === 400) {
            const errors = {}
            data.errors.forEach(error => {
                errors[error.path] = error.message
            })

            return Promise.reject(errors)
        }

        return data
    })
}