const Router = require('koa-router')
const v1     = require('./v1')

const router = Router()

router.use('/v1', v1.routes())

module.exports = router
