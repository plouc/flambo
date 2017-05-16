exports.PAGINATION_TYPE_PAGE     = 'PAGINATION_TYPE_PAGE'
exports.PAGINATION_TYPE_EXPLICIT = 'PAGINATION_TYPE_EXPLICIT'
exports.PAGINATION_TYPE_CURSOR   = 'PAGINATION_TYPE_CURSOR'

const validTypes  = [
    exports.PAGINATION_TYPE_PAGE,
    exports.PAGINATION_TYPE_EXPLICIT,
    exports.PAGINATION_TYPE_CURSOR,
]

exports.ensureValidType = type => {
    if (!validTypes.includes(type)) {
        throw new TypeError(`Invalid pagination type provided: "${type}", must be one of: ${validTypes.join(', ')}`)
    }
}

exports.middleware               = require('./middleware')
exports.dto                      = require('./dto')
