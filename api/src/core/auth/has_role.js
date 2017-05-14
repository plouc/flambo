module.exports = role => async (ctx, next) => {
    if (!ctx.state.user || !ctx.state.user.role) {
        ctx.status = 401
        return
    }

    if (ctx.state.user.role !== role) {
        ctx.status = 403
        return
    }

    await next()
}
