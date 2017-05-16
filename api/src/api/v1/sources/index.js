const Router     = require('koa-router')

const auth       = require('../../../core/auth')
const validation = require('../../../core/validation')
const Pagination = require('../../../core/pagination')
const Sources    = require('../../../modules/sources')
const Feed       = require('../../../modules/feed')
const feedDto    = require('../feed/dto')
const schemas    = require('./schemas')
const dto        = require('./dto')


const router     = Router()

router.get(
    '/',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const sources        = await Sources.all(Object.assign({}, pagination, {
            limit: pagination.limit + 1,
        }))

        ctx.body = Pagination.dto(Pagination.PAGINATION_TYPE_PAGE)(pagination, dto.collection(sources))
    }
)

router.get(
    '/:id',
    auth.middleware,
    async ctx => {
        const source = await Sources.get(ctx.params.id)

        ctx.body = dto.item(source)
    }
)

router.put(
    '/:id',
    auth.middleware,
    auth.hasRole('admin'),
    validation.validateBody(schemas.create),
    async ctx => {
        const source = await Sources.update(ctx.params.id, ctx.request.body)

        ctx.body = source
    }
)

router.get(
    '/:id/feed',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const items = await Feed.search(Object.assign({}, pagination, {
            query: { source_id: ctx.params.id },
        }))

        ctx.body = feedDto.feed(items)
    }
)

router.get(
    '/:id/jobs',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const jobs           = await Sources.getSourceJobs(ctx.params.id, Object.assign({}, pagination, {
            limit: pagination.limit + 1,
        }))

        ctx.body = Pagination.dto(Pagination.PAGINATION_TYPE_PAGE)(pagination, jobs)
    }
)

router.post(
    '/:id/load',
    auth.middleware,
    auth.hasRole('admin'),
    async ctx => {
        const source = await Sources.get(ctx.params.id)
        const result = await Sources.load(source)

        ctx.body = result
    }
)

router.post(
    '/',
    auth.middleware,
    auth.hasRole('admin'),
    validation.validateBody(schemas.create),
    async ctx => {
        const createdSource = await Sources.create(Object.assign(
            ctx.request.body,
            { owner_id: ctx.state.user.id }
        ))

        ctx.status = 201
        ctx.body   = createdSource
    }
)

module.exports = router
