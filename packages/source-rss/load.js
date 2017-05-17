const FeedParser = require('feedparser')
const uuid       = require('uuid')
const request    = require('request-promise-native')


module.exports = config => source => new Promise((resolve, reject) => {
    const req    = request(source.data.url)
    const parser = new FeedParser()

    req.on('error', reject)

    req.on('response', function (res) {
        const stream = this

        if (res.statusCode !== 200) {
            this.emit('error', new Error('Bad status code'))
        } else {
            stream.pipe(parser)
        }
    })

    parser.on('error', reject)

    const items = []
    parser.on('end', () => { resolve(items) })

    parser.on('readable', function () {
        const stream = this
        let item

        while (item = stream.read()) {
            items.push({
                id:           uuid.v4(),
                title:        item.title,
                link:         item.link,
                external_id:  item.guid,
                image:        item.image.url ? item.image.url : null,
                published_at: item.pubdate,
                content:      item.summary,
                source_id:    source.id,
                source_name:  source.name,
                source_type:  source.type,
            })
        }
    })
})
