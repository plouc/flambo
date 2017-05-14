const Router         = require('koa-router')

const auth           = require('../../../core/auth')
const validation     = require('../../../core/validation')
const Pagination     = require('../../../core/pagination')
const Users          = require('../../../modules/users')
const Comments       = require('../../../modules/comments')
const Collections    = require('../../../modules/collections')
const collectionsDto = require('../collections/dto')
const Feed           = require('../../../modules/feed')
const feedDto        = require('../feed/dto')
const schemas        = require('./schemas')
const dto            = require('./dto')


const router     = Router()

router.get(
    '/',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const users          = await Users.all(Object.assign({}, pagination, {
            limit: pagination.limit + 1,
        }))

        ctx.body = Pagination.dto(pagination, dto.users(users))
    }
)

router.get(
    '/me',
    auth.middleware,
    async ctx => {
        const user = await Users.get(ctx.state.user.id)

        ctx.body = dto.user(user)
    }
)

router.get(
    '/:id',
    auth.middleware,
    async ctx => {
        const user = await Users.get(ctx.params.id)

        if (!user) {
            ctx.status = 404
        } else {
            ctx.body = dto.user(user)
        }
    }
)

router.get(
    '/:id/feed',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        //ctx.params.id,
        const items = await Feed.search(Object.assign({}, pagination))

        ctx.body = feedDto.feed(items)
    }
)

router.get(
    '/:id/comments',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const comments = await Comments.all(Object.assign({}, pagination, {
            limit: pagination.limit + 1,
            query: {
                'author.id': ctx.params.id,
            },
        }))

        ctx.body = Pagination.dto(pagination, dto.comments(comments))
    }
)

router.get(
    '/:id/collections/public',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const collections = await Collections.all(Object.assign({}, pagination, {
            limit: pagination.limit + 1,
            query: {
                'owner.id': ctx.params.id,
                public:     true,
            },
        }))

        ctx.body = Pagination.dto(pagination, collectionsDto.collections(collections))
    }
)

router.get(
    '/:id/collections/subscriptions',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const collections = await Collections.all(Object.assign({}, pagination, {
            limit: pagination.limit + 1,
            query: {
                'subscription.user_id': ctx.params.id,
                public:                 true,
            },
        }))

        ctx.body = Pagination.dto(pagination, collectionsDto.collections(collections))
    }
)

router.post(
    '/',
    auth.middleware,
    auth.hasRole('admin'),
    validation.validateBody(schemas.create),
    async ctx => {
        try {
            const createdUser = await Users.create(ctx.request.body)

            ctx.status = 200
            ctx.body   = createdUser
        } catch (error) {
            console.error(error)

            ctx.status = 500
            ctx.body   = 'Internal Server Error'
        }
    }
)

module.exports = router
