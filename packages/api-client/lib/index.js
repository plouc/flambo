'use strict';

var partialRight = require('lodash/partialRight');
var modules = require('./modules');

/**
 * @typedef {Object} ClientOptions
 * @property {string} [apiUrl='http://localhost:7000/api/v1']
 * @property {string} token
 * @property {Object} [headers={}]
 */

Object.keys(modules).forEach(function (moduleId) {
    var module = modules[moduleId];
    exports[moduleId] = module;
});

/**
 * @method init
 * @param {ClientOptions} options
 * @return {{collections, groups, sources, users}}
 */
exports.client = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var api = {};
    Object.keys(modules).forEach(function (moduleId) {
        var module = modules[moduleId];

        var boundModule = {};
        Object.keys(module).forEach(function (method) {
            boundModule[method] = partialRight(module[method], options);
        });

        api[moduleId] = boundModule;
    });

    return api;
};