const Joi        = require('joi')

const validation = require('../validation')


const generateMiddleware = (
    validationSchema,
    extractPagination
) => {
    return async function pagination(ctx, next) {
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

        const pagination = extractPagination(input)

        ctx.state = ctx.state || {}
        ctx.state.pagination = pagination

        await next()
    }
}

exports.usingPage = ({
    limitDefault = 10,
    limitMax     = 200,
} = {}) => {
    const validationSchema = Joi.object().keys({
        page:     Joi.number().min(1),
        per_page: Joi.number().min(1).max(limitMax),
    })

    const extractPagination = input => {
        const pagination = Object.assign({
            page:     1,
            per_page: limitDefault,
            offset:   0,
        }, input)
        if (input.page !== undefined) {
            pagination.offset = (input.page - 1) * pagination.per_page
        }
        pagination.limit = pagination.per_page

        return pagination
    }

    return generateMiddleware(validationSchema, extractPagination)
}

exports.usingOffsetLimit = ({
    limitDefault = 10,
    limitMax     = 200,
} = {}) => {
    const validationSchema = Joi.object().keys({
        offset: Joi.number().min(0),
        limit:  Joi.number().min(1).max(limitMax),
    })

    const extractPagination = input => {
        return Object.assign({
            offset: 0,
            limit:  limitDefault,
        }, input)
    }

    return generateMiddleware(validationSchema, extractPagination)
}

exports.usingCursor = ({
    limitDefault = 10,
    limitMax     = 200,
} = {}) => {
    const validationSchema = Joi.object().keys({
        first: Joi.number().min(1).max(limitMax),
        after: Joi.string(),
    })

    const extractPagination = input => {
        const pagination = Object.assign({
            first: limitDefault,
        }, input)
        if (pagination.after !== undefined) {
            pagination.after = JSON.parse(
                Buffer.from(pagination.after, 'base64').toString('ascii')
            )
        }

        return pagination
    }

    return generateMiddleware(validationSchema, extractPagination)
}
