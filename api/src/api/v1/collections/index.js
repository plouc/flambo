const Router       = require('koa-router')

const validateBody = require('../../../core/middlewares/body_validator')
const pagination   = require('../../../core/middlewares/pagination')
const Groups       = require('../../../modules/groups')
const schemas      = require('./schemas')


const router       = Router()

router.get(
    '/',
    pagination(),
    async ctx => {
        const groups = await Groups.all(Object.assign({}, ctx.state.pagination))

        ctx.body = {
            items: groups,
        }
    }
)

router.get('/:id', async ctx => {
    const group = await Groups.get(ctx.params.id)

    ctx.body = group
})

router.post('/', validateBody(schemas.create), async (ctx, next) => {
    try {
        const createdGroup = await Groups.create(ctx.request.body)

        ctx.status = 200
        ctx.body   = createdGroup
    } catch (error) {
        console.error(error)

        ctx.status = 500
        ctx.body   = 'Internal Server Error'
    }
})

module.exports = router
