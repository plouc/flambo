require('dotenv').config({ silent: true })

const Koa         = require('koa')
const chalk       = require('chalk')
const Router      = require('koa-router')
const bodyParser  = require('koa-bodyparser')
const mount       = require('koa-mount')
const cors        = require('kcors')
const serve       = require('koa-static')
const graphqlHTTP = require('koa-graphql')
const logger      = require('@ekino/logger')

const config      = require('./src/core/config')

logger.setGlobalContext({
    service: `flambo`,
})
logger.setLevel(config.get('logger.level'))
logger.setNamespaces(config.get('logger.namespaces'))
logger.setOutput(config.get('logger.output'))

const api         = require('./src/api')
const schema      = require('./src/graphql')

const app         = new Koa()
const router      = new Router()
const log         = logger('entrypoint')

app.use(bodyParser())
app.use(cors())
app.use(mount('/static', serve('./static')))

router.use(api.routes())

router.all('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))

app.use(router.routes())

const listening = () => {
    log.error(`api listening on port ${config.get('port')}`)
}

app.listen(config.get('port'), listening)
