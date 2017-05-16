const Router       = require('koa-router')

const auth         = require('../../../core/auth')
const validation   = require('../../../core/validation')
const Pagination   = require('../../../core/pagination')
const Groups       = require('../../../modules/groups')
const Users        = require('../../../modules/users')
const Comments     = require('../../../modules/comments')
const Sources      = require('../../../modules/sources')
const Feed         = require('../../../modules/feed')
const feedDto      = require('../feed/dto')
const schemas      = require('./schemas')
const dto          = require('./dto')


const router       = Router()

router.get(
    '/',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const viewerId       = ctx.state.user.id

        const groups = await Groups.all(Object.assign({}, pagination, {
            limit: pagination.limit + 1,
            viewerId,
        }))

        ctx.body = Pagination.dto(Pagination.PAGINATION_TYPE_PAGE)(pagination, dto.groups(groups, viewerId))
    }
)

router.get(
    '/:id',
    auth.middleware,
    async ctx => {
        const groupId  = ctx.params.id
        const viewerId = ctx.state.user.id

        const group = await Groups.get(groupId, viewerId)

        if (!group) {
            ctx.status = 404
            ctx.body   = { message: `No group found for id: ${groupId}` }
            return
        }

        ctx.body = dto.group(group, viewerId)
    }
)

router.get(
    '/:id/feed',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const sourceIds = await Groups.getGroupSourceIds(ctx.params.id)

        if (sourceIds.length === 0) {
            ctx.body = feedDto.feed({ docs: [] })
            return
        }

        const { pagination } = ctx.state
        const items = await Feed.search(Object.assign({}, pagination, {
            query: { source_id: sourceIds },
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
        const comments = await Comments.groupComments(ctx.params.id, Object.assign({}, pagination, {
            limit: pagination.limit + 1,
        }))

        ctx.body = Pagination.dto(Pagination.PAGINATION_TYPE_PAGE)(pagination, dto.comments(comments))
    }
)

router.post(
    '/:id/comments',
    auth.middleware,
    validation.validateBody(schemas.comment),
    async ctx => {
        const groupId = ctx.params.id

        const createdComment = await Comments.create(Object.assign(
            ctx.request.body,
            {
                group_id:  groupId,
                author_id: ctx.state.user.id,
            }
        ))

        ctx.status = 200
        ctx.body   = createdComment
    }
)

router.get(
    '/:id/members',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const members = await Users.allByGroup(ctx.params.id, Object.assign({}, pagination, {
            limit: pagination.limit + 1,
        }))

        ctx.body = Pagination.dto(Pagination.PAGINATION_TYPE_PAGE)(pagination, dto.members(members))
    }
)

router.get(
    '/:id/sources',
    auth.middleware,
    Pagination.middleware(),
    async ctx => {
        const { pagination } = ctx.state
        const sources = await Sources.all(Object.assign({}, pagination, {
            limit: pagination.limit + 1,
            query: {
                'group.id': ctx.params.id,
            }
        }))

        ctx.body = Pagination.dto(Pagination.PAGINATION_TYPE_PAGE)(pagination, sources)
    }
)

router.post(
    '/:id/membership',
    auth.middleware,
    async ctx => {
        const membership = await Groups.addMember(ctx.params.id, ctx.state.user.id)

        ctx.body = membership
    }
)

router.delete(
    '/:id/membership',
    auth.middleware,
    async ctx => {
        await Groups.removeMember(ctx.params.id, ctx.state.user.id)

        ctx.body = {}
    }
)

router.put(
    '/:id',
    auth.middleware,
    auth.hasRole('admin'),
    validation.validateBody(schemas.create),
    async ctx => {
        const group = await Groups.update(ctx.params.id, ctx.request.body)

        ctx.body = group
    }
)

router.post(
    '/',
    auth.middleware,
    auth.hasRole('admin'),
    validation.validateBody(schemas.create),
    async ctx => {
        const createdGroup = await Groups.create(Object.assign(
            ctx.request.body,
            { owner_id: ctx.state.user.id }
        ))

        ctx.status = 201
        ctx.body   = createdGroup
    }
)

module.exports = router
