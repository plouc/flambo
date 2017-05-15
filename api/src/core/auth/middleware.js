const jwt     = require('koa-jwt')
const compose = require('koa-compose')

const db      = require('../database')
const config  = require('../config')


const jwtMiddleware = jwt({
    secret: config.get('jwt.secret')
})

const checkUser = async (ctx, next) => {
    if (!ctx.state.user.id) {
        ctx.status = 401
        return
    }

    const user = await db.from('users')
        .where('id', ctx.state.user.id)
        .then(([u]) => u)

    if (!user) {
        ctx.status = 401
        return
    }

    ctx.state.user.role = user.role

    await next()
}

module.exports = compose([
    jwtMiddleware,
    checkUser,
])
