/** @module groups */

/*    
 * This code were auto-generated
 * DO NOT EDIT!
 * 
 * generated on: Wed May 24 2017 22:27:55 GMT+0900 (JST)
 */
const builder = require('./builder')

module.exports = {
    /**
     * List groups
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
            path: '/groups',
            method: 'get',
            query: {
                page,
                per_page,
            },
        })
        return fetch(req.url, req.options).then(res => res.json())
    },
    /**
     * Get a group by its ID
     *
     * @param {string} id - The group ID
     * @param {ClientOptions} [clientOptions] - The global client options
     */ get: (
        id,
        clientOptions
    ) => {
        const req = builder.build(clientOptions, {
            path: '/groups/{id}',
            method: 'get',
            params: {
                id,
            },
        })
        return fetch(req.url, req.options).then(res => res.json())
    },
    /**
     * Create a new group, the owner will be the current user.
  
     *
     * @param {Object} group - Properties of the group to create
     * @param {string} group.name
     * @param {string} group.slug
     * @param {string} [group.description]
     * @param {ClientOptions} [clientOptions] - The global client options
     */ create: (
        group,
        clientOptions
    ) => {
        const req = builder.build(clientOptions, {
            path: '/groups',
            method: 'post',
            body: JSON.stringify(group),
        })
        return fetch(req.url, req.options).then(res => res.json())
    },
    /**
     * Get a group feed
     *
     * @param {string} id - The group ID
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
            path: '/groups/{id}/feed',
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
     * Get a group comments
     *
     * @param {string} id - The group ID
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
            path: '/groups/{id}/comments',
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
     * Get group sources
     *
     * @param {string} id - The group ID
     * @param {Object} [params]
     * @param {number} [params.page=1] - [pagination] The desired page (starts at 1).
     * @param {number} [params.per_page=10] - [pagination] The desired number of items per page (max 100).
     * @param {ClientOptions} [clientOptions] - The global client options
     */ sources: (
        id,
        { page = 1, per_page = 10 } = {},
        clientOptions
    ) => {
        const req = builder.build(clientOptions, {
            path: '/groups/{id}/sources',
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
     * Get group members
     *
     * @param {string} id - The group ID
     * @param {Object} [params]
     * @param {number} [params.page=1] - [pagination] The desired page (starts at 1).
     * @param {number} [params.per_page=10] - [pagination] The desired number of items per page (max 100).
     * @param {ClientOptions} [clientOptions] - The global client options
     */ members: (
        id,
        { page = 1, per_page = 10 } = {},
        clientOptions
    ) => {
        const req = builder.build(clientOptions, {
            path: '/groups/{id}/members',
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
