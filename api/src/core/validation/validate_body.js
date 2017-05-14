const _        = require('lodash')
const validate = require('./validate')


module.exports = (schema, opts = {}) => {
    const options = Object.assign({}, opts)

    options.stripUnknown = (_.isBoolean(options.stripUnknown)) ? options.stripUnknown : true

    return async function bodyValidator(ctx, next) {
        const { error: validationError, data } = validate(ctx.request.body, schema, options)

        if (validationError) {
            ctx.response.status = 400
            ctx.response.body   = validationError
            return
        }

        ctx.request.body = data
        await next()
    }
}
