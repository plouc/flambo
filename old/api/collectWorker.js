const workQueue         = require('./src/lib/work-queue')
const SourceLoader      = require('./src/sources/SourceLoader')
const TwitterSource     = require('./src/sources/TwitterSource')
const RssSource         = require('./src/sources/RssSource')
const Indexer           = require('./src/sources/Indexer')
const dotenv            = require('dotenv')
dotenv.config({ silent: true })
const container         = require('./src/container')
const SourcesRepository = require('./src/repositories/SourcesRepository')


SourceLoader.registerLoaders({
    rss:     RssSource(),
    twitter: TwitterSource(Object.assign({}, container.get('twitter_config'), { timeout_ms: 10 * 1000 })),
})


workQueue.getConsumer(container)
    .then(consumer => {
        console.log('collect worker ready to handle incoming messages')

        consumer.consume((message, ack) => {
            const sourceId = message.content.toString()
            console.log(`received message for source id: ${sourceId}`)

            SourcesRepository.find(sourceId)
                .then(source => {
                    if (source) {
                        console.log(`found source: ${source.name}`, source)

                        return SourceLoader.load(source.type, source.data)
                            .then(collected => {
                                console.log(`collected ${collected.length} items`)
                            })
                    }
                })
                .catch(err => {
                    console.error(err)
                })
                .then(() => {
                    ack()
                })
        })
    })
