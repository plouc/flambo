/** @module users */

/*    
 * This code were auto-generated
 * DO NOT EDIT!
 * 
 * generated on: Fri May 26 2017 11:08:31 GMT+0900 (JST)
 */
const builder = require('./builder')

module.exports = {
    /**
     * List users
     *
     * @param {Object} [params]
     * @param {number} [params.page=1] - [pagination] The desired page (starts at 1).
     * @param {number} [params.per_page=10] - [pagination] The desired number of items per page (max 100).
     * @param {ClientOptions} [clientOptions] - The global client options
     */ find: (
        { page = 1, per_page = 10 } = {},
        clientOptions
    ) => {
        const req = builder.build(clientOptions, {
            path: '/users',
            method: 'get',
            query: {
                page,
                per_page,
            },
        })
        return fetch(req.url, req.options).then(res => res.json())
    },
    /**
     * Get a user
     *
     * @param {string} id - The user ID
     * @param {ClientOptions} [clientOptions] - The global client options
     */ get: (
        id,
        clientOptions
    ) => {
        const req = builder.build(clientOptions, {
            path: '/users/{id}',
            method: 'get',
            params: {
                id,
            },
        })
        return fetch(req.url, req.options).then(res => res.json())
    },
    /**
     * Get user feed
     *
     * @param {string} id - The user ID
     * @param {Object} [params]
     * @param {number} [params.page=1] - [pagination] The desired page (starts at 1).
     * @param {number} [params.per_page=10] - [pagination] The desired number of items per page (max 100).
     * @param {ClientOptions} [clientOptions] - The global client options
     */ feed: (
        id,
        { page = 1, per_page = 10 } = {},
        clientOptions
    ) => {
        const req = builder.build(clientOptions, {
            path: '/users/{id}/feed',
            method: 'get',
            params: {
                id,
            },
            query: {
                page,
                per_page,
            },
        })
        return fetch(req.url, req.options).then(res => res.json())
    },
    /**
     * Get user comments
     *
     * @param {string} id - The user ID
     * @param {Object} [params]
     * @param {number} [params.page=1] - [pagination] The desired page (starts at 1).
     * @param {number} [params.per_page=10] - [pagination] The desired number of items per page (max 100).
     * @param {ClientOptions} [clientOptions] - The global client options
     */ comments: (
        id,
        { page = 1, per_page = 10 } = {},
        clientOptions
    ) => {
        const req = builder.build(clientOptions, {
            path: '/users/{id}/comments',
            method: 'get',
            params: {
                id,
            },
            query: {
                page,
                per_page,
            },
        })
        return fetch(req.url, req.options).then(res => res.json())
    },
}
