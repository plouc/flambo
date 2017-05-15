const Router      = require('koa-router')

const auth        = require('../../../core/auth')
const validation  = require('../../../core/validation')
const Pagination  = require('../../../core/pagination')
const Collections = require('../../../modules/collections')
const Comments    = require('../../../modules/comments')
const Users       = require('../../../modules/users')
const Feed        = require('../../../modules/feed')
const feedDto     = require('../feed/dto')
const schemas     = require('./schemas')
const dto         = require('./dto')


const router      = Router()

router.get(
    '/',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const viewerId       = ctx.state.user.id

        try {
            const collections    = await Collections.all(Object.assign({}, pagination, {
                limit: pagination.limit + 1,
                query: { public: true },
                viewerId,
            }))

            ctx.body = Pagination.dto(pagination, dto.collections(collections, viewerId))
        } catch (error) {
            ctx.status = 500
            ctx.body   = 'Internal Server Error'
        }
    }
)

router.get(
    '/:id',
    auth.middleware,
    async ctx => {
        const collectionId = ctx.params.id
        const viewerId     = ctx.state.user.id

        try {
            const collection = await Collections.get(collectionId, viewerId)

            if (!collection) {
                ctx.status = 404
                ctx.body   = { message: `No collection found for id: ${collectionId}` }
                return
            }

            ctx.body = dto.collection(collection, viewerId)
        } catch (error) {
            ctx.status = 500
            ctx.body   = 'Internal Server Error'
        }
    }
)

router.get(
    '/:id/feed',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const collection = await Collections.get(ctx.params.id)

        const { ids } = collection.selection
        if (!ids || ids.length === 0) {
            ctx.body = feedDto.feed({ docs: [] })
            return
        }

        const { pagination } = ctx.state
        const items = await Feed.search(Object.assign({}, pagination, {
            query: { id: ids },
        }))

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
                'collection.id': ctx.params.id,
            },
        }))

        ctx.body = Pagination.dto(pagination, dto.comments(comments))
    }
)

router.post(
    '/:id/comments',
    auth.middleware,
    validation.validateBody(schemas.comment),
    async ctx => {
        const collectionId = ctx.params.id

        try {
            const createdComment = await Comments.create(Object.assign(
                ctx.request.body,
                {
                    collection_id: collectionId,
                    author_id:     ctx.state.user.id,
                }
            ))

            ctx.status = 200
            ctx.body   = createdComment
        } catch (error) {
            console.error(error)

            ctx.status = 500
            ctx.body   = 'Internal Server Error'
        }
    }
)

router.get(
    '/:id/subscribers',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const subscribers = await Users.allByCollection(ctx.params.id, Object.assign({}, pagination, {
            limit: pagination.limit + 1,
        }))

        ctx.body = Pagination.dto(pagination, dto.subscribers(subscribers))
    }
)

router.post(
    '/:id/subscription',
    auth.middleware,
    async ctx => {
        const subscription = await Collections.addSubscriber(ctx.params.id, ctx.state.user.id)

        ctx.body = subscription
    }
)

router.delete(
    '/:id/subscription',
    auth.middleware,
    async ctx => {
        await Collections.removeSubscriber(ctx.params.id, ctx.state.user.id)

        ctx.body = {}
    }
)

router.post(
    '/',
    auth.middleware,
    validation.validateBody(schemas.create),
    async ctx => {
        const createdCollection = await Collections.create(Object.assign(
            ctx.request.body,
            {
                owner_id:  ctx.state.user.id,
                selection: { ids: [] },
                public:    true,
            }
        ))

        ctx.status = 201
        ctx.body   = createdCollection
    }
)

module.exports = router
