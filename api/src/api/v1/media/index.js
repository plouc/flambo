const Router      = require('koa-router')

const auth        = require('../../../core/auth')
const validation  = require('../../../core/api/validation')
const Pagination  = require('../../../core/api/pagination')
const Collections = require('../../../modules/collections')
const schemas     = require('./schemas')


const router      = Router()

router.get(
    '/',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const collections    = await Collections.all(Object.assign({}, pagination, {
            limit: pagination.limit + 1,
        }))

        ctx.body = Pagination.dto(pagination, collections)
    }
)

router.get(
    '/:id',
    auth.middleware,
    async ctx => {
        const collection = await Collections.get(ctx.params.id)

        ctx.body = collection
    }
)

router.post(
    '/',
    auth.middleware,
    validation.validateBody(schemas.create),
    async ctx => {
        try {
            const createdCollection = await Collections.create(ctx.request.body)

            ctx.status = 200
            ctx.body   = createdCollection
        } catch (error) {
            console.error(error)

            ctx.status = 500
            ctx.body   = 'Internal Server Error'
        }
    }
)

module.exports = router
