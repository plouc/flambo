const dotenv        = require('dotenv')
const SourceLoader  = require('./src/sources/SourceLoader')
const TwitterSource = require('./src/sources/TwitterSource')
const RssSource     = require('./src/sources/RssSource')
const Indexer       = require('./src/sources/Indexer')

dotenv.config({ silent: true })

const container = require('./src/container')
const indexer   = Indexer(container.get('elastic'))

SourceLoader.registerLoaders({
    rss:     RssSource(),
    twitter: TwitterSource(Object.assign({}, container.get('twitter_config'), { timeout_ms: 10 * 1000 })),
})

const r = container.get('rethinkdb')
r.table('sources').run()
    .then(sources => SourceLoader.batchLoad(sources))
    .then(results => {
        return indexer.index(results)
        //return r.table('news_items').insert(results).run(conn);
    })
    .then(() => {
        r.getPoolMaster().drain()
    })
.catch(err => {
    console.error(err)
    process.exit(1)
})