require('dotenv').config({ silent: true })

const config  = require('../src/core/config')
const db      = require('../src/core/database')
const elastic = require('../src/core/elastic')
const Sources = require('../src/modules/sources')


return elastic.deleteByQuery({
        index: config.get('elastic.index'),
        body:  {
            query: { match_all: {} },
        },
    })
    .then(() => Sources.all({ limit: 50 }))
    .then(sources => {
        return Promise.all(
            sources.map(source => {
                return new Promise(resolve => {
                    if (source.type === 'rss') {
                        resolve(Sources.types.rss.load(source))
                    } else if (source.type === 'meetup') {
                        resolve(Sources.types.meetup.load(source))
                    }
                })
                    .then(items => {
                        if (items.length === 0) return true

                        const body = []
                        items.forEach(item => {
                            body.push({ index:  {
                                _index: config.get('elastic.index'),
                                _type:  'item',
                            } })

                            body.push(item)
                        })

                        return elastic.bulk({ body })
                    })
            })
        )
    })
    .catch(err => {
        console.error(err)
    })
    .then(() => {
        db.destroy()
    })
