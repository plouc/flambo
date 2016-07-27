const Jimple        = require('jimple')
const elasticsearch = require('elasticsearch')
const rethinkdb     = require('rethinkdbdash')
const amqp          = require('amqplib')
const multer        = require('multer')
const crypto        = require('crypto')
const mime          = require('mime')
const Auth          = require('./lib/auth')

const container = new Jimple()


container.set('app_port', process.env.APP_PORT)

container.set('jwt_secret', process.env.JWT_SECRET)

container.set('auth', c => Auth(c.get('jwt_secret')))

container.set('upload', c => {
    const storage = multer.diskStorage({
        destination: 'uploads/',
        filename(req, file, cb) {
            crypto.pseudoRandomBytes(16, (err, raw) => {
                cb(err, err ? undefined : `${raw.toString('hex')}.${mime.extension(file.mimetype)}`)
            })
        },
    })

    return multer({ storage })
})


container.set('elastic_host', process.env.ELASTIC_HOST)
container.set('elastic_port', process.env.ELASTIC_PORT)

container.set('elastic', c => {
    return new elasticsearch.Client({
        host: `${c.get('elastic_host')}:${c.get('elastic_port')}`,
        log:  'info',
    })
})


container.set('rethinkdb_host',     process.env.RETHINKDB_HOST)
container.set('rethinkdb_port',     process.env.RETHINKDB_PORT)
container.set('rethinkdb_auth_key', process.env.RETHINKDB_AUTH_KEY)
container.set('rethinkdb_db',       process.env.RETHINKDB_DB)

container.set('rethinkdb', c => {
    return rethinkdb({
        host:    c.get('rethinkdb_host'),
        port:    c.get('rethinkdb_port'),
        authKey: c.get('rethinkdb_auth_key'),
        db:      c.get('rethinkdb_db'),
    })
})


container.set('rabbitmq_host', process.env.RABBITMQ_HOST)

container.set('amqp', c => amqp.connect(`amqp://${c.get('rabbitmq_host')}`))


container.set('twitter_config', {
    consumer_key:        process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:     process.env.TWITTER_CONSUMER_SECRET,
    access_token:        process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})


module.exports = container
