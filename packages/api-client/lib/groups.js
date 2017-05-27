'use strict';

/** @module groups */

/*    
 * This code were auto-generated
 * DO NOT EDIT!
 * 
 * generated on: Fri May 26 2017 11:08:31 GMT+0900 (JST)
 */
var builder = require('./builder');

module.exports = {
    /**
     * List groups
     *
     * @param {Object} [params]
     * @param {number} [params.page=1] - [pagination] The desired page (starts at 1).
     * @param {number} [params.per_page=10] - [pagination] The desired number of items per page (max 100).
     * @param {ClientOptions} [clientOptions] - The global client options
     */find: function find() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$page = _ref.page,
            page = _ref$page === undefined ? 1 : _ref$page,
            _ref$per_page = _ref.per_page,
            per_page = _ref$per_page === undefined ? 10 : _ref$per_page;

        var clientOptions = arguments[1];

        var req = builder.build(clientOptions, {
            path: '/groups',
            method: 'get',
            query: {
                page: page,
                per_page: per_page
            }
        });
        return fetch(req.url, req.options).then(function (res) {
            return res.json();
        });
    },
    /**
     * Get a group by its ID
     *
     * @param {string} id - The group ID
     * @param {ClientOptions} [clientOptions] - The global client options
     */get: function get(id, clientOptions) {
        var req = builder.build(clientOptions, {
            path: '/groups/{id}',
            method: 'get',
            params: {
                id: id
            }
        });
        return fetch(req.url, req.options).then(function (res) {
            return res.json();
        });
    },
    /**
     * Create a new group, the owner will be the current user.
        *
     * @param {Object} group - Properties of the group to create
     * @param {string} group.name
     * @param {string} group.slug
     * @param {string} [group.description]
     * @param {ClientOptions} [clientOptions] - The global client options
     */create: function create(group, clientOptions) {
        var req = builder.build(clientOptions, {
            path: '/groups',
            method: 'post',
            body: JSON.stringify(group)
        });
        return fetch(req.url, req.options).then(function (res) {
            return res.json();
        });
    },
    /**
     * Get a group feed
     *
     * @param {string} id - The group ID
     * @param {Object} [params]
     * @param {number} [params.page=1] - [pagination] The desired page (starts at 1).
     * @param {number} [params.per_page=10] - [pagination] The desired number of items per page (max 100).
     * @param {ClientOptions} [clientOptions] - The global client options
     */feed: function feed(id) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$page = _ref2.page,
            page = _ref2$page === undefined ? 1 : _ref2$page,
            _ref2$per_page = _ref2.per_page,
            per_page = _ref2$per_page === undefined ? 10 : _ref2$per_page;

        var clientOptions = arguments[2];

        var req = builder.build(clientOptions, {
            path: '/groups/{id}/feed',
            method: 'get',
            params: {
                id: id
            },
            query: {
                page: page,
                per_page: per_page
            }
        });
        return fetch(req.url, req.options).then(function (res) {
            return res.json();
        });
    },
    /**
     * Get a group comments
     *
     * @param {string} id - The group ID
     * @param {Object} [params]
     * @param {number} [params.page=1] - [pagination] The desired page (starts at 1).
     * @param {number} [params.per_page=10] - [pagination] The desired number of items per page (max 100).
     * @param {ClientOptions} [clientOptions] - The global client options
     */comments: function comments(id) {
        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref3$page = _ref3.page,
            page = _ref3$page === undefined ? 1 : _ref3$page,
            _ref3$per_page = _ref3.per_page,
            per_page = _ref3$per_page === undefined ? 10 : _ref3$per_page;

        var clientOptions = arguments[2];

        var req = builder.build(clientOptions, {
            path: '/groups/{id}/comments',
            method: 'get',
            params: {
                id: id
            },
            query: {
                page: page,
                per_page: per_page
            }
        });
        return fetch(req.url, req.options).then(function (res) {
            return res.json();
        });
    },
    /**
     * Get group sources
     *
     * @param {string} id - The group ID
     * @param {Object} [params]
     * @param {number} [params.page=1] - [pagination] The desired page (starts at 1).
     * @param {number} [params.per_page=10] - [pagination] The desired number of items per page (max 100).
     * @param {ClientOptions} [clientOptions] - The global client options
     */sources: function sources(id) {
        var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref4$page = _ref4.page,
            page = _ref4$page === undefined ? 1 : _ref4$page,
            _ref4$per_page = _ref4.per_page,
            per_page = _ref4$per_page === undefined ? 10 : _ref4$per_page;

        var clientOptions = arguments[2];

        var req = builder.build(clientOptions, {
            path: '/groups/{id}/sources',
            method: 'get',
            params: {
                id: id
            },
            query: {
                page: page,
                per_page: per_page
            }
        });
        return fetch(req.url, req.options).then(function (res) {
            return res.json();
        });
    },
    /**
     * Get group members
     *
     * @param {string} id - The group ID
     * @param {Object} [params]
     * @param {number} [params.page=1] - [pagination] The desired page (starts at 1).
     * @param {number} [params.per_page=10] - [pagination] The desired number of items per page (max 100).
     * @param {ClientOptions} [clientOptions] - The global client options
     */members: function members(id) {
        var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref5$page = _ref5.page,
            page = _ref5$page === undefined ? 1 : _ref5$page,
            _ref5$per_page = _ref5.per_page,
            per_page = _ref5$per_page === undefined ? 10 : _ref5$per_page;

        var clientOptions = arguments[2];

        var req = builder.build(clientOptions, {
            path: '/groups/{id}/members',
            method: 'get',
            params: {
                id: id
            },
            query: {
                page: page,
                per_page: per_page
            }
        });
        return fetch(req.url, req.options).then(function (res) {
            return res.json();
        });
    }
};