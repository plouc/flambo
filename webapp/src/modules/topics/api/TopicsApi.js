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
export const list = () => {
    return fetch(`${BASE_URL}/topics`, {
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(doneHandler, failureHandler)
}

/**
 * Gets a topic by its id.
 *
 * @method
 * @param {string} id - The topic id
 * @returns {Promise.<Topic, Error>}
 */
export const get = id => {
    return fetch(`${BASE_URL}/topics/${id}`, {
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(doneHandler, failureHandler)
}

/**
 * Lists topic news items.
 *
 * @method
 * @param {string} id - The topic id
 * @returns {Promise.<Array, Error>}
 */
export const getTopicNewsItems = (id, { limit = 10, page = 1, filters = {} }) => {
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

export const create = topic => {
    const result = {
        hasError: false,
        errors:   [],
        topic:    null,
    }

    return fetch(`${BASE_URL}/topics`, {
        method:  'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(topic),
    })
    .then(res => {
        result.hasError = res.status === 400
        return res.json()
    })
    .then(topic => {
        if (topic.errors) {
            result.errors = topic.errors
        } else {
            result.topic = topic
        }

        return result
    })
    .catch(err => {
        console.error(err)
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

export const update = (id, topic) => {
    const result = {
        hasError: false,
        errors:   [],
        topic:    null,
    }

    return fetch(`${BASE_URL}/topics/${id}`, {
        method:  'PUT',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(topic),
    })
    .then(res => {
        result.hasError = res.status === 400
        return res.json()
    })
    .then(topic => {
        if (topic.errors) {
            result.errors = topic.errors
        } else {
            result.topic = topic
        }

        return result
    })
    .catch(err => {
        console.error(err)
    })
}