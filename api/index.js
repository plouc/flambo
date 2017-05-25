require('dotenv').config({ silent: true })

const Koa         = require('koa')
const chalk       = require('chalk')
const Router      = require('koa-router')
const logger      = require('koa-logger')
const bodyParser  = require('koa-bodyparser')
const mount       = require('koa-mount')
const cors        = require('kcors')
const serve       = require('koa-static')
const graphqlHTTP = require('koa-graphql')

const config      = require('./src/core/config')
const api         = require('./src/api')
const schema      = require('./src/graphql')

const app         = new Koa()
const router      = new Router()

app.use(logger())
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
    console.log(`${chalk.blue('[flambo]')} running at ${chalk.white(`http://localhost:${config.get('port')}`)}`)
}

app.listen(config.get('port'), listening)
