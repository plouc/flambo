const Router     = require('koa-router')

const auth       = require('../../../core/auth')
const validation = require('../../../core/validation')
const Pagination = require('../../../core/pagination')
const Media      = require('../../../modules/media')
const upload     = require('../../../core/upload')


const router     = Router()


router.get(
    '/',
    auth.middleware,
    Pagination.middleware.usingPage(),
    async ctx => {
        const { pagination } = ctx.state
        const media = await Media.all(Object.assign({}, pagination, {
            limit: pagination.limit + 1,
        }))

        ctx.body = Pagination.dto.withPage(pagination, media)
    }
)

router.get(
    '/:id',
    auth.middleware,
    async ctx => {
        const medium = await Media.get(ctx.params.id)

        ctx.body = medium
    }
)

router.post(
    '/upload',
    auth.middleware,
    upload.single('file'),
    async ctx => {
        const file   = ctx.state.upload
        const medium = await Media.create(file)

        ctx.body   = medium
        ctx.status = 201
    }
)

module.exports = router
