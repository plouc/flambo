/**
 * @module lib/middlewares/restMiddleware
 */

const _ = require('lodash')

/**
 * Returns default rest object to be appended to request.
 *
 * @returns {{ sort: Object, fields: string }} The rest object
 */
const restDefaults = () => ({
    sort:       {},
    fields:     '*',
    filters:    {},
    pagination: {
        page:   1,
        offset: 0,
        limit:  10,
    },
})

/**
 * This middleware extracts fields to return from request query string.
 *
 * ```
 * /api/posts?fields=title,category
 * ```
 *
 * will translate to:
 *
 * ```
 * { fields: ['title', 'category'] }
 * ```
 *
 * @param {string} [parameterName = 'sort] - The name of query parameter to use for filtering
 * @param {Array}  [allowedFields = []]    - A list of allowed fields, empty array means no check
 * @param {string} [separator = ',']       - A separator to use to split field names
 * @returns {function()} The middleware
 */
const fields = (parameterName = 'fields', allowedFields = [], separator = ',') => {
    return (req, res, next) => {
        req.rest = req.rest || restDefaults()

        if (req.query[parameterName]) {
            const fieldsToInclude = req.query[parameterName].split(separator)

            if (allowedFields.length > 0) {
                for (let i = 0; i < fieldsToInclude.length; i++) {
                    const includeField = fieldsToInclude[i]
                    if (!allowedFields.includes(includeField)) {
                        return res.status(400).json({
                            message: `Invalid field: ${includeField}, must be one of: ${allowedFields.join(', ')}`,
                        })
                    }
                }
            }

            req.rest.fields = fieldsToInclude
        }

        next()
    }
}

/**
 * This middleware extracts sort directives from request query string.
 *
 * ```
 * /api/posts?sort=-createdAt,title
 * ```
 *
 * will translate to:
 *
 * ```
 * { sort: { createdAt: 'desc', title: 'desc' } }
 * ```
 *
 * @param {string} [parameterName = 'sort'] - The name of query parameter to use for sorting
 * @param {Array}  [allowedFields = []]    - A list of allowed fields, empty array means no check
 * @param {string} [separator = ',']       - A separator to use to split sort directives
 * @returns {function()} The middleware
 */
const sort = (options = {}) => {
    _.defaultsDeep(options, {
        parameterName: 'sort',
        allowedFields: [],
        separator:     ',',
        directionFn:   dir => dir,
    })

    const {
        parameterName,
        allowedFields,
        separator,
        directionFn,
    } = options

    return (req, res, next) => {
        req.rest = req.rest || restDefaults()

        if (req.query[parameterName]) {
            const directives = req.query[parameterName].split(separator)
            for (let i = 0; i < directives.length; i++) {
                const directive = directives[i]

                let sortField
                let sortDir
                if (directive.startsWith('-')) {
                    sortField = directive.slice(1)
                    sortDir   = 'desc'
                } else {
                    sortField = directive
                    sortDir   = 'asc'
                }

                if (allowedFields.length > 0 && !allowedFields.includes(sortField)) {
                    return res.status(400).json({
                        message: `Invalid sort field: ${sortField}, must be one of: ${allowedFields.join(', ')}`,
                    })
                }

                req.rest.sort[sortField] = directionFn(sortDir)
            }
        }

        next()
    }
}

const defaultPaginationOptions = {
    page:    { key: 'page'               },
    perPage: { key: 'per_page', max: 100 },
}

/**
 * This middleware computes limit and offset from request query parameters.
 *
 * ```
 * /api/posts?page=1&per_page=10
 * ```
 *
 * will translate to:
 *
 * ```
 * { pagination: {
 *     page:   1,
 *     offset: 0,
 *     limit:  10,
 * } }
 * ```
 *
 * @param {Object} [partialOptions = {}] - Middleware options, see defaultPaginationOptions
 * @returns {function()} The middleware
 */
const pagination = (partialOptions = {}) => {
    const options = _.defaultsDeep(partialOptions, defaultPaginationOptions)

    return (req, res, next) => {
        req.rest = req.rest || restDefaults()

        if (req.query[options.perPage.key]) {
            const perPage = parseInt(req.query[options.perPage.key], 10)
            if (Number.isNaN(perPage) || perPage <= 0) {
                return res.status(400).json({
                    message: `Invalid ${options.perPage.key} parameter: must be a number greater than 0`,
                })
            }

            if (perPage > options.perPage.max) {
                return res.status(400).json({
                    message: `Invalid ${options.perPage.key} parameter: limit exceeded (current: ${perPage}, max: ${options.perPage.max})`,
                })
            }

            req.rest.pagination.limit = perPage
        }

        if (req.query[options.page.key]) {
            const page = parseInt(req.query[options.page.key], 10)
            if (Number.isNaN(page) || page < 0) {
                return res.status(400).json({
                    message: `Invalid ${options.page.key} parameter: must be a number greater or equal than 0`,
                })
            }

            if (page > 1) {
                req.rest.pagination.page   = page
                req.rest.pagination.offset = (page - 1) * req.rest.pagination.limit
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
 * @returns {function()} The middleware
 */
const filters = (excludes = []) => {
    return (req, res, next) => {
        req.rest = req.rest || restDefaults()

        let filterKeys = Object.keys(req.query)
        if (excludes.length > 0) {
            filterKeys = filterKeys.filter(key => !excludes.includes(key))
        }

        filterKeys.forEach(filterKey => {
            req.rest.filters[filterKey] = req.query[filterKey]
        });

        next()
    }
}

exports.fields     = fields
exports.collection = { sort, pagination, filters }
