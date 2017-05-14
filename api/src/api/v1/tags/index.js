const Router = require('koa-router')
const Tags   = require('../../../modules/tags')

const router = Router()

router.get('/', async function (ctx) {
    const tags = await Tags.all()

    ctx.body = tags
})

module.exports = router
