'use strict'

const _ = require('lodash')
const joi = require('joi')

const validator = require('../../../core/validator')
const errorDto = require('../../core/error_dto')
const log = require('../../../core/logger')('alfred:api:validator')

/**
 * default rest options object to be appended to request.
 *
 * @returns {{ sort: Object, fields: string }} The restOptions object
 */
const restDefaultOptions = () => {
    return {
        sort: {},
        fields: '*',
        filters: {},
        pagination: {
            page: 1,
            offset: 0,
            limit: 10
        }
    }
}

/**
 * This middleware extracts sort directives from request query string.
 *
 * /api/posts?sort=-createdAt,title
 *
 * will translate to:
 *
 * { sort: { createdAt: 'desc', title: 'desc' } }
 *
 * If there is not sort param in query, we sort by default by the first allowedField.
 *
 * @param {string} [parameterName = 'sort] - The name of query parameter to use for sorting
 * @param {Array}  [allowedFields = []]    - A list of allowed fields, empty array means no check
 * @param {string} [separator = ',']       - A separator to use to split sort directives
 * @returns {function()} The middleware
 */
const sort = (parameterName = 'sort', allowedFields = [], separator = ',') => {
    return (req, res, next) => {
        req.restOptions = req.restOptions || restDefaultOptions()

        if (req.query[parameterName]) {
            const directives = req.query[parameterName].split(separator)
            for (let i = 0; i < directives.length; i++) {
                const directive = directives[i]

                let sortField
                let sortDir
                if (directive.startsWith('-')) {
                    sortField = directive.slice(1)
                    sortDir = 'desc'
                } else {
                    sortField = directive
                    sortDir = 'asc'
                }

                if (allowedFields.length > 0 && !allowedFields.includes(sortField)) {
                    const contextId = req.state ? req.state.contextId : null
                    const errorMessage = `Invalid sort field: ${sortField}, must be one of: "${allowedFields.join(', ')}"`
                    log.debug(contextId, errorMessage)
                    const error = errorDto.validationError(errorMessage, null)
                    return res.status(400).json(error)
                }

                req.restOptions.sort[sortField] = sortDir
            }
        } else if (allowedFields[0]) {
            req.restOptions.sort[allowedFields[0]] = 'asc'
        }

        next()
    }
}

const defaultPaginationOptions = {
    page: { key: 'page' },
    perPage: { key: 'perPage', max: 10000 }
}

/**
 * This middleware computes limit and offset from request query parameters.
 *
 * /api/posts?page=1&perPage=10
 *
 * will translate to:
 *
 * { pagination: {
 *     page:   1,
 *     offset: 0,
 *     limit:  10,
 * } }
 *
 * @param {Object} [partialOptions = {}] - Middleware options, see defaultPaginationOptions
 * @returns {function()} The middleware
 */
const pagination = (partialOptions = {}) => {
    const options = _.defaultsDeep(partialOptions, defaultPaginationOptions)

    return (req, res, next) => {
        req.restOptions = req.restOptions || restDefaultOptions()

        const pagination = {
            page: req.query[options.page.key],
            perPage: req.query[options.perPage.key]
        }

        const paginationSchema = joi.object().keys({
            page: joi.number().min(1),
            perPage: joi.number().min(1).max(options.perPage.max)
        })

        const { error: validationError, data } = validator.validate(pagination, paginationSchema)
        if (validationError) {
            const contextId = req.state ? req.state.contextId : null
            log.debug(contextId, 'An unexpected error occured during pagination validation', { validationError })
            const error = errorDto.validationError('Validation error for pagination', validationError.data)
            return res.status(400).json(error)
        }

        if (data.perPage) {
            req.restOptions.pagination.limit = data.perPage
        }

        if (data.page) {
            req.restOptions.pagination.page = data.page
            if (data.page > 1) {
                req.restOptions.pagination.offset = (data.page - 1) * req.restOptions.pagination.limit
            }
        }

        next()
    }
}

/**
 * This middleware extracts filters from request query string.
 * Note that this feature use some (theorically) non allowed characters (https://tools.ietf.org/html/rfc3986#section-2.2)
 *
 * /api/posts?date=10-12-2015&date=10-12-2016&name=raph*
 *
 * will translate to:
 *
 * { filters: {
 *     date: ['10-12-2015', '10-12-2016'],
 *     name: 'raph*',
 * } }
 *
 * @param {Array} [excludes = []] - A list of field names to exclude, empty array means no exclusion
 * @param {Object} filterSchema - The joi validation shema for filters
 * @returns {function()} The middleware
 */
const filters = (excludes = [], filterSchema) => {
    return (req, res, next) => {
        req.restOptions = req.restOptions || restDefaultOptions()

        const filters = _.omit(req.query, excludes)

        const { error: validationError, data } = validator.validate(filters, filterSchema, { stripUnknown: false })
        if (validationError) {
            const contextId = req.state ? req.state.contextId : null
            log.debug(contextId, 'An unexpected error occured during filtering validation', { validationError })
            const error = errorDto.validationError('Validation error for filters', validationError.data)
            return res.status(400).json(error)
        }

        req.restOptions.filters = data

        next()
    }
}

module.exports = { sort, pagination, filters }
