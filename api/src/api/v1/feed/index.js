const Router      = require('koa-router')

const auth        = require('../../../core/auth')
const Pagination  = require('../../../core/pagination')
const Feed        = require('../../../modules/feed')
const dto         = require('./dto')


const router      = Router()

router.get(
    '/',
    auth.middleware,
    Pagination.middleware.usingPage(),
    async ctx => {
        const { pagination } = ctx.state
        const items = await Feed.search(Object.assign({}, pagination))

        ctx.body = dto.feed(items)
    }
)

module.exports = router
