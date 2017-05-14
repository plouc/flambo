const _          = require('lodash')
const Joi        = require('joi')

const validation = require('../validation')


const DEFAULTS = {
    page:    { key: 'page',     default: 1 },
    perPage: { key: 'per_page', default: 10, max: 10000 },
}

module.exports = (opts = {}) => {
    const options = _.defaultsDeep(opts, DEFAULTS)

    const validationSchema = Joi.object().keys({
        page:    Joi.number().min(1),
        perPage: Joi.number().min(1).max(options.perPage.max),
    })

    return async function pagination(ctx, next) {
        const {
            [options.page.key]:    page    = options.page.default,
            [options.perPage.key]: perPage = options.perPage.default,
        } = ctx.request.query

        const { error: validationError, data } = validation.validate({ page, perPage }, validationSchema)
        if (validationError) {
            ctx.response.status = 400
            ctx.response.body   = validationError
            return
        }

        ctx.state = ctx.state || {}
        ctx.state.pagination = Object.assign({}, data, {
            offset: 0,
            limit:  data.perPage,
        })

        if (page !== undefined && page > 1) {
            ctx.state.pagination.offset = (page - 1) * ctx.state.pagination.limit
        }

        await next()
    }
}
