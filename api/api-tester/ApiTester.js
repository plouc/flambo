/**
 * @module test/ApiTester
 */

const _       = require('lodash')
const request = require('request').defaults({ json: true })

let store       = {}
let baseUrl     = ''
let headers     = {}
let queryString = {}
let body
let response

exports.setBaseUrl = base => {
    baseUrl = base
}

exports.getBaseUrl = () => baseUrl


exports.store = (id, value) => {
    store[id] = value
}

/**
 * Append a http header to current request for later use.
 *
 * @param {string}        headerKey
 * @param {string|number} headerValue
 *
 * @returns {undefined}
 */
exports.setHeader = (headerKey, headerValue) => {
    headers[headerKey] = headerValue
}

exports.removeHeader = headerKey => {
    delete headers[headerKey]
}

/**
 * Append a query parameter to current request for later use.
 *
 * @param {string}        queryParamKey
 * @param {string|number} queryParamValue
 *
 * @returns {undefined}
 */
exports.setQueryParameter = (queryParamKey, queryParamValue) => {
    queryString[queryParamKey] = queryParamValue
}

/**
 * Set request body json.
 *
 * @param {Object} json - An object to use as request json body
 * @returns {undefined}
 */
exports.setJson = json => {
    body = body || {}

    Object.keys(json).forEach(key => {
        _.set(body, key, json[key])
    })
}

/**
 * Reset all stateful properties.
 *
 * @returns {undefined}
 */
exports.reset = () => {
    store       = {}
    headers     = {}
    queryString = {}
    body        = undefined
    response    = undefined
}

const bindUriParams = uri => {
    return uri.replace(/\/:[0-9a-z]+/gi, part => {
        const param = part.slice(2)
        if (!store.hasOwnProperty(param)) {
            return '/NOT_FOUND'
        }

        return `/${store[param]}`
    })
}

/**
 * Performs a GET operation on given uri.
 *
 * @param {string} uri - The uri on which you want to perform the get operation
 *
 * @returns {Promise}
 */
exports.get = uri => new Promise((resolve, reject) => {
    const options = {
        baseUrl,
        uri:    bindUriParams(uri),
        method: 'GET',
        qs:     queryString,
        headers,
    }

    request(options, (err, res) => {
        if (err) {
            reject(err)
        } else {
            response = res
            resolve(res)
        }
    })
})

/**
 * Performs a POST operation on given uri.
 *
 * @param {string} uri - The uri on which you want to perform the post operation
 *
 * @returns {Promise.<Object, Error>}
 */
exports.post = uri => new Promise((resolve, reject) => {
    const options = {
        baseUrl,
        uri:    bindUriParams(uri),
        method: 'POST',
        qs:     queryString,
        headers,
    };

    if (body) {
        options.body = body
    }

    request(options, (err, res) => {
        if (err) {
            reject(err)
        } else {
            response = res
            resolve(res)
        }
    })
})

exports.delete = uri => new Promise((resolve, reject) => {
    const options = {
        baseUrl,
        uri:    bindUriParams(uri),
        method: 'DELETE',
        qs:     queryString,
        headers,
    };

    if (body) {
        options.body = body
    }

    request(options, (err, res) => {
        if (err) {
            reject(err)
        } else {
            response = res
            resolve(res)
        }
    })
})

/**
 * Returns last response http status code.
 *
 * @returns {number} The http status code or -1 if no response available
 */
exports.getStatusCode = () => {
    if (response) {
        return response.statusCode
    }

    return -1
}

/**
 * Returns last response body.
 *
 * @returns {*} The response body or null if unavailable
 */
exports.getBody = () => {
    if (response) {
        return response.body
    }

    return null
}

/**
 * Returns last response header.
 *
 * @param {string} header - The header name
 *
 * @returns {*} The response header or null if unavailable
 */
exports.getHeader = header => {
    const normalizedHeader = header.toLowerCase()

    if (response) {
        return response.headers[normalizedHeader]
    }

    return null
}
