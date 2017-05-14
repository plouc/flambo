const Joi   = require('joi')

const {
    make:  makeError,
    types: errorTypes,
} = require('../error')

/**
 * Validate with joi schema.
 *
 * @param {*} data - Data to validate
 * @param {object} schema - schema
 * @param {object} [opts] - joi options
 * @return {object} result
 * @return {*} [result.data] - Casted data
 * @return {Object} [result.error] - If schema is invalid, or an error occurred
 */
module.exports = (data, schema, opts = {}) => {
    const result = Joi.validate(data, schema, opts)

    if (!result.error) return { data: result.value }

    if (result.error.name !== 'ValidationError') {
        return {
            error: makeError(
                errorTypes.UNCAUGHT_ERROR,
                'A joi validation error occured',
                { error: result.error }
            ),
        }
    }

    const message = (result.error.details) ? result.error.details.join(', ') : ''
    const error = makeError(errorTypes.MALFORMATTED_DATA, message, result.error.details)
    return { error }
}