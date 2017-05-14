const Router      = require('koa-router')

const validation  = require('../../core/validation')
const auth        = require('../../core/auth')
const groups      = require('./groups')
const users       = require('./users')
const sources     = require('./sources')
const tags        = require('./tags')
const collections = require('./collections')
const media       = require('./media')
const feed        = require('./feed')


const router      = Router()

router.post(
    '/login',
    validation.validateBody(auth.schemas.login),
    async ctx => {
        const { login, password } = ctx.request.body
        const result = await auth.authenticate(login, password)

        ctx.body = result
    }
)

router.use('/groups',      groups.routes())
router.use('/users',       users.routes())
router.use('/sources',     sources.routes())
router.use('/tags',        tags.routes())
router.use('/collections', collections.routes())
router.use('/media',       media.routes())
router.use('/feed',        feed.routes())

module.exports = router
