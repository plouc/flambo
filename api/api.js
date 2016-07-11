const express         = require('express')
const bodyParser      = require('body-parser')
const cors            = require('cors')
const compress        = require('compression')
const app             = express()
const dotenv          = require('dotenv')
const WebSocketServer = require('uws').Server
const workQueue       = require('./src/lib/work-queue')
const Users           = require('./src/resources/UsersResource')
const Topics          = require('./src/resources/TopicsResource')
const NewsItems       = require('./src/resources/NewsItemsResource')
const Sources         = require('./src/resources/SourcesResource')
const Collections     = require('./src/resources/CollectionsResource')
dotenv.config({ silent: true })
const container       = require('./src/container')


console.log(process.env.NODE_ENV)


Promise.all([
    workQueue.getProducer(container),
]).then(([producer]) => {
    container.set('work_queue_producer', producer)

    app.use(compress())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cors({
        exposedHeaders: ['X-Total', 'X-Limit', 'X-Page'],
    }))

    app.use('/uploads', express.static('uploads'))
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('public'))
    }

    // add some delay for UI testing purpose
    //app.use((req, res, next) => { setTimeout(next, 1000) })

    app.use('/api/v1/users',       Users(container))
    app.use('/api/v1/topics',      Topics(container))
    app.use('/api/v1/sources',     Sources(container))
    app.use('/api/v1/news_items',  NewsItems)
    app.use('/api/v1/collections', Collections)

    const server = app.listen(container.get('app_port'), () => {
        console.log(`app listening on port: ${container.get('app_port')}`)
    })

    const wss = new WebSocketServer({
        server,
        path: '/watch',
    })

    container.set('wss', wss)

    wss.on('connection', ws => {
        console.log('connected to watcher')

        const r = container.get('rethinkdb')
        r
            .table('users').merge({ type: 'users' })
            .union(r.table('topics').merge({ type: 'topics' }))
            .union(r.table('sources').merge({ type: 'sources' }))
            .changes().run((err, cursor) => {
                if (err) throw err;
                cursor.each((err, row) => {
                    if (err) throw err

                    ws.send(JSON.stringify(row))

                    console.log(row)
                })
            })
            .error(err => {
                console.error(err)
            })

        /*
         ws.on('message', message => {
         console.log('message', message);
         //mozaik.bus.clientSubscription(clientId, JSON.parse(request));
         });

         ws.on('close', () => {
         console.log('bye');
         //mozaik.bus.removeClient(clientId);
         });
         */
    })
})
