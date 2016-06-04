const dotenv        = require('dotenv');
const SourceLoader  = require('./src/sources/SourceLoader');
const TwitterSource = require('./src/sources/TwitterSource');
const RssSource     = require('./src/sources/RssSource');
const Indexer       = require('./src/sources/Indexer');

dotenv.config({ silent: true });

const container = require('./src/container');

const indexer = Indexer(container.get('elastic'));

SourceLoader.register('twitter', TwitterSource({
    consumer_key:        process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:     process.env.TWITTER_CONSUMER_SECRET,
    access_token:        process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms:          10*1000
}));

SourceLoader.register('rss', RssSource());

const r = container.get('rethinkdb');
r.table('sources').run()
    .then(sources => SourceLoader.batchLoad(sources))
    .then(results => {
        return indexer.index(results);
        //return r.table('news_items').insert(results).run(conn);
    })
    .then(() => {
        r.getPoolMaster().drain();
    })
.catch(err => {
    console.error(err);
    process.exit(1);
});