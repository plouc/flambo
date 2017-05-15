'use strict'

const request = require('request').defaults({ json: true })
const _ = require('lodash')
const helpers = require('../step_definitions/helpers')

// REQUEST INFORMATIONS
let requestBody = null
let requestHeaders = {}
let requestQuery = null

// RESPONSE INFORMATIONS
let response = null

exports.reset = () => {
    requestBody    = null
    requestHeaders = {}
    requestQuery   = null
    response       = null
}

exports.setHeader = (key, value) => {
    requestHeaders[key] = helpers.coerceToType(value)
}

exports.setBody = body => {
    requestBody = helpers.coerceTypeForObject(body)
}

exports.setQuery = query => {
    requestQuery = helpers.coerceTypeForObject(query)
}

exports.getResponse = () => {
    return response
}

exports.makeRequest = (method, path, baseUrl) => {
    return new Promise((resolve, reject) => {
        const options = {
            baseUrl: baseUrl,
            uri: path,
            method,
            qs:      requestQuery || {},
            headers: requestHeaders,
        }

        if (requestBody !== null) {
            if (!['POST', 'PUT'].includes(method)) {
                throw new Error(`You can only provides a body for POST and PUT HTTP methods, found: ${method}`)
            }

            options.body = requestBody
        }

        request(options, (_error, _response, _body) => {
            if (_error) {
                console.error(_error, options) // eslint-disable-line no-console
                reject()
            }

            response = _response
            resolve()
        })
    })
}
