const Router         = require('koa-router')

const auth           = require('../../../core/auth')
const Pagination     = require('../../../core/pagination')
const Comments       = require('../../../modules/comments')


const router         = Router()

router.get(
    '/',
    auth.middleware,
    Pagination.middleware({
        type: Pagination.PAGINATION_TYPE_CURSOR,
    }),
    async ctx => {
        const { pagination } = ctx.state
        const comments       = await Comments.all(Object.assign({}, pagination, {
            limit: pagination.first + 1,
            after: pagination.after,
        }))

        ctx.body = Pagination.dto(Pagination.PAGINATION_TYPE_CURSOR, {
            cursor: 'serial',
        })(pagination, comments)
    }
)

module.exports = router
