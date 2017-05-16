const Joi        = require('joi')

const validation = require('../validation')
const {
    PAGINATION_TYPE_PAGE,
    PAGINATION_TYPE_EXPLICIT,
    PAGINATION_TYPE_CURSOR,
          ensureValidType,
} = require('./index')


module.exports = ({
    type         = PAGINATION_TYPE_PAGE,
    limitDefault = 10,
    limitMax     = 200,
} = {}) => {
    ensureValidType(type)

    let validationSchema
    if (type === PAGINATION_TYPE_PAGE) {
        validationSchema = Joi.object().keys({
            page:     Joi.number().min(1),
            per_page: Joi.number().min(1).max(limitMax),
        })
    } else if (type === PAGINATION_TYPE_EXPLICIT) {
        validationSchema = Joi.object().keys({
            offset: Joi.number().min(0),
            limit:  Joi.number().min(1).max(limitMax),
        })
    } else if (type === PAGINATION_TYPE_CURSOR) {
        validationSchema = Joi.object().keys({
            first: Joi.number().min(1).max(limitMax),
            after: Joi.string(),
        })
    }

    return async function pagination(ctx, next) {
        console.log('pagination query', type, ctx.query)

        const {
            error: validationError,
            data:  input,
        } = validation.validate(ctx.query, validationSchema, {
            stripUnknown: true,
        })
        if (validationError) {
            ctx.response.status = 400
            ctx.response.body   = validationError
            return
        }

        console.log('pagination validated', type, input)

        let pagination
        if (type === PAGINATION_TYPE_PAGE) {
            pagination = Object.assign({
                page:     1,
                per_page: limitDefault,
                offset:   0,
            }, input)
            if (input.page !== undefined) {
                pagination.offset = (input.page - 1) * pagination.per_page
            }
            pagination.limit = pagination.per_page
        } else if (type === PAGINATION_TYPE_EXPLICIT) {
            pagination = Object.assign({
                offset: 0,
                limit:  limitDefault,
            }, input)
        } else if (type === PAGINATION_TYPE_CURSOR) {
            pagination = Object.assign({
                first: limitDefault,
            }, input)
            if (pagination.after !== undefined) {
                pagination.after = Buffer.from(pagination.after, 'base64').toString('ascii')
            }
        }

        ctx.state = ctx.state || {}
        ctx.state.pagination = pagination

        console.log('pagination', type, pagination)

        await next()
    }
}
