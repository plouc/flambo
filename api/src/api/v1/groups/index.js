const Router  = require('koa-router')
const Sources = require('../../../modules/sources')

const router = Router()

router.get('/', async function (ctx) {
    const sources = await Sources.all()

    ctx.body = sources
})

module.exports = router
