'use strict';

var memoize = require('lodash/memoize');
var template = require('lodash/template');
var defaults = require('lodash/defaults');
var qs = require('qs');

var clientDefaults = {
    apiUrl: 'http://localhost:7000/api/v1',
    headers: {}
};

var pathTemplate = function pathTemplate(path) {
    return template(path, { interpolate: /{([\s\S]+?)}/g });
};
var memoizedPathTemplate = memoize(pathTemplate);

exports.build = function () {
    var clientOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var path = _ref.path,
        _ref$params = _ref.params,
        params = _ref$params === undefined ? {} : _ref$params,
        _ref$method = _ref.method,
        method = _ref$method === undefined ? 'GET' : _ref$method,
        _ref$headers = _ref.headers,
        headers = _ref$headers === undefined ? {} : _ref$headers,
        query = _ref.query,
        body = _ref.body;

    var options = defaults(clientOptions, clientDefaults);
    if (!options.token) {
        throw new Error('You must provide a valid token');
    }

    var pathTemplate = memoizedPathTemplate(path);

    var url = '' + options.apiUrl + pathTemplate(params);
    if (query !== undefined && Object.keys(query).length > 0) {
        url = url + '?' + qs.stringify(query);
    }

    var requestOptions = {
        method: method,
        headers: Object.assign({
            'Authorization': 'Bearer ' + options.token,
            'Content-Type': 'application/json'
        }, options.headers, headers),
        body: body
    };

    return { url: url, options: requestOptions };
};