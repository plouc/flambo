const Router     = require('koa-router')

const auth       = require('../../../core/auth')
const Pagination = require('../../../core/pagination')
const Comments   = require('../../../modules/comments')


const router     = Router()

router.get(
    '/',
    auth.middleware,
    Pagination.middleware.usingCursor(),
    async ctx => {
        const { pagination } = ctx.state
        const comments       = await Comments.all(Object.assign({}, pagination, {
            limit: pagination.first + 1,
            after: pagination.after,
        }))

        ctx.body = Pagination.dto.withCursor({
            cursor: ['serial'],
        })(pagination, comments)
    }
)

module.exports = router
