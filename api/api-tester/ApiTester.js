/**
 * @module test/ApiTester
 */

const _       = require('lodash')
const request = require('request').defaults({ json: true })
const debug   = require('debug')('api-tester')

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
            debug(`parameter "${param}" not found`)

            return '/NOT_FOUND'
        }

        debug(`replaced "${param}" with "${store[param]}"`)

        return `/${store[param]}`
    })
}

const doRequest = (method, uri) => {
    return new Promise((resolve, reject) => {
        const options = {
            baseUrl,
            uri: bindUriParams(uri),
            method,
            qs:  queryString,
            headers,
        }

        if (['POST', 'PUT'].includes(method) && body) {
            options.body = body
        }

        debug(`${method} ${options.uri}`)

        request(options, (err, res) => {
            if (err) {
                reject(err)
            } else {
                debug(`${method} ${options.uri} —> ${res.statusCode}`)
                debug(`Headers:\n${Object.keys(res.headers).map(header => `    ${header}   ${res.headers[header]}`).join('\n')}`)
                response = res
                resolve(res)
            }
        })
    })
}

/**
 * Performs a GET operation on given uri.
 *
 * @param {string} uri - The uri on which you want to perform the get operation
 *
 * @returns {Promise}
 */
exports.get = uri => doRequest('GET', uri)

/**
 * Performs a POST operation on given uri.
 *
 * @param {string} uri - The uri on which you want to perform the post operation
 *
 * @returns {Promise.<Object, Error>}
 */
exports.post = uri => doRequest('POST', uri)

/**
 * Performs a PUT operation on given uri.
 *
 * @param {string} uri - The uri on which you want to perform the post operation
 *
 * @returns {Promise.<Object, Error>}
 */
exports.put = uri => doRequest('PUT', uri)

/**
 * Performs a DELETE operation on given uri.
 *
 * @param {string} uri - The uri on which you want to perform the get operation
 *
 * @returns {Promise}
 */
exports.delete = uri => doRequest('DELETE', uri)

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
