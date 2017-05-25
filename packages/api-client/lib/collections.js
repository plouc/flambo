/** @module collections */

/*    
 * This code were auto-generated
 * DO NOT EDIT!
 * 
 * generated on: Wed May 24 2017 22:27:54 GMT+0900 (JST)
 */
const builder = require('./builder')

module.exports = {
    /**
     * List collections
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
            path: '/collections',
            method: 'get',
            query: {
                page,
                per_page,
            },
        })
        return fetch(req.url, req.options).then(res => res.json())
    },
    /**
     * Get a collection
     *
     * @param {string} id - The collection ID
     * @param {ClientOptions} [clientOptions] - The global client options
     */ get: (
        id,
        clientOptions
    ) => {
        const req = builder.build(clientOptions, {
            path: '/collections/{id}',
            method: 'get',
            params: {
                id,
            },
        })
        return fetch(req.url, req.options).then(res => res.json())
    },
    /**
     * Create a collection for the current user.
     *
     * @param {Object} collection - Properties of the collection to create
     * @param {string} collection.name - Collection name
     * @param {string} [collection.description] - Collection description
     * @param {boolean} collection.public - Defines if the collection will be publicly visible
     * @param {ClientOptions} [clientOptions] - The global client options
     */ create: (
        collection,
        clientOptions
    ) => {
        const req = builder.build(clientOptions, {
            path: '/collections',
            method: 'post',
            body: JSON.stringify(collection),
        })
        return fetch(req.url, req.options).then(res => res.json())
    },
    /**
     * Get a collection feed
     *
     * @param {string} id - The collection ID
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
            path: '/collections/{id}/feed',
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
     * Get a collection comments
     *
     * @param {string} id - The collection ID
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
            path: '/collections/{id}/comments',
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
     * Get a collection subscribers
     *
     * @param {string} id - The collection ID
     * @param {Object} [params]
     * @param {number} [params.page=1] - [pagination] The desired page (starts at 1).
     * @param {number} [params.per_page=10] - [pagination] The desired number of items per page (max 100).
     * @param {ClientOptions} [clientOptions] - The global client options
     */ subscribers: (
        id,
        { page = 1, per_page = 10 } = {},
        clientOptions
    ) => {
        const req = builder.build(clientOptions, {
            path: '/collections/{id}/subscribers',
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
