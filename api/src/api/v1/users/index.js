const Router         = require('koa-router')
const log            = require('@ekino/logger')('api:v1:users')

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
    Pagination.middleware.usingCursor(),
    async ctx => {
        const { pagination } = ctx.state
        const users          = await Users.all(Object.assign({}, pagination, {
            limit: pagination.first + 1,
            after: pagination.after,
        }))

        ctx.body = Pagination.dto.withCursor({
            cursor: ['id', 'last_name'],
        })(pagination, dto.users(users))
    }
)

router.get(
    '/stats/total',
    auth.middleware,
    async ctx => {
        const total = await Users.userCount()

        ctx.body = { total }
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
        const userId = ctx.params.id

        try {
            const user = await Users.get(userId)

            if (!user) {
                ctx.status = 404
                ctx.body   = { message: `No user found for id: ${userId}` }
                return
            }

            ctx.body = dto.user(user)
        } catch (error) {
            const errorMessage = `An error occurred while fetching user: ${userId}`
            log.error(errorMessage, { error, userId })

            ctx.status = 500
            ctx.body   = { error: errorMessage }
        }
    }
)

router.get(
    '/:id/feed',
    auth.middleware,
    Pagination.middleware.usingPage(),
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
    Pagination.middleware.usingPage(),
    async ctx => {
        const { pagination } = ctx.state
        const comments = await Comments.all(Object.assign({}, pagination, {
            limit: pagination.limit + 1,
            query: {
                'author.id': ctx.params.id,
            },
        }))

        ctx.body = Pagination.dto.withPage(pagination, dto.comments(comments))
    }
)

router.get(
    '/:id/collections/public',
    auth.middleware,
    Pagination.middleware.usingPage(),
    async ctx => {
        const { pagination } = ctx.state
        const collections = await Collections.all(Object.assign({}, pagination, {
            limit: pagination.limit + 1,
            query: {
                'owner.id': ctx.params.id,
                public:     true,
            },
        }))

        ctx.body = Pagination.dto.withPage(pagination, collectionsDto.collections(collections))
    }
)

router.get(
    '/:id/collections/subscriptions',
    auth.middleware,
    Pagination.middleware.usingPage(),
    async ctx => {
        const { pagination } = ctx.state
        const collections = await Collections.all(Object.assign({}, pagination, {
            limit: pagination.limit + 1,
            query: {
                'subscription.user_id': ctx.params.id,
                public:                 true,
            },
        }))

        ctx.body = Pagination.dto.withPage(pagination, collectionsDto.collections(collections))
    }
)

router.post(
    '/',
    auth.middleware,
    auth.hasRole('admin'),
    validation.validateBody(schemas.create),
    async ctx => {
        const createdUser = await Users.create(ctx.request.body)

        ctx.status = 201
        ctx.body   = createdUser
    }
)

module.exports = router
