const Router  = require('koa-router')

const router = Router()

router.get('/', (ctx, next) => {
    ctx.body = 'sources'
})

module.exports = router
