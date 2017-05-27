'use strict';

/** @module users */

/*    
 * This code were auto-generated
 * DO NOT EDIT!
 * 
 * generated on: Fri May 26 2017 11:08:31 GMT+0900 (JST)
 */
var builder = require('./builder');

module.exports = {
    /**
     * List users
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
            path: '/users',
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
     * Get a user
     *
     * @param {string} id - The user ID
     * @param {ClientOptions} [clientOptions] - The global client options
     */get: function get(id, clientOptions) {
        var req = builder.build(clientOptions, {
            path: '/users/{id}',
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
     * Get user feed
     *
     * @param {string} id - The user ID
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
            path: '/users/{id}/feed',
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
     * Get user comments
     *
     * @param {string} id - The user ID
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
            path: '/users/{id}/comments',
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