const busboy  = require('koa-busboy')
const compose = require('koa-compose')


exports.single = (fieldName, options) => {
    const bb = busboy({
        limits: {
            fields: 0,
            files:  1,
        },
    })

    return compose([bb])
}