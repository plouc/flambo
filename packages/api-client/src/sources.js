/** @module sources */

/*    
 * This code were auto-generated
 * DO NOT EDIT!
 * 
 * generated on: Fri May 26 2017 11:08:31 GMT+0900 (JST)
 */
const builder = require('./builder')

module.exports = {
    /**
     * List sources
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
            path: '/sources',
            method: 'get',
            query: {
                page,
                per_page,
            },
        })
        return fetch(req.url, req.options).then(res => res.json())
    },
    /**
     * Get a source
     *
     * @param {string} id - The source ID
     * @param {ClientOptions} [clientOptions] - The global client options
     */ get: (
        id,
        clientOptions
    ) => {
        const req = builder.build(clientOptions, {
            path: '/sources/{id}',
            method: 'get',
            params: {
                id,
            },
        })
        return fetch(req.url, req.options).then(res => res.json())
    },
    /**
     * Get source feed
     *
     * @param {string} id - The source ID
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
            path: '/sources/{id}/feed',
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
