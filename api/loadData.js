const dotenv      = require('dotenv')
dotenv.config({ silent: true })
const _           = require('lodash')
const fs          = require('fs-extra')
const yaml        = require('./src/lib/yaml')
const container   = require('./src/container')

const r = container.get('rethinkdb')

const util = require('util')

const mapGeneratedIds = collection => ({ generated_keys}) => collection.forEach((item, i) => { item.id = generated_keys[i] })

const logAndExit = err => {
    console.log(err)
    r.getPoolMaster().drain()
    process.exit(1)
}

const logAndProceed = err => {
    console.error(err.message)
    console.log('processing anyway…')
}

Promise.all([
    yaml.loadYamlFile('./fixtures/users.yml'),
    yaml.loadYamlFile('./fixtures/sources.yml'),
    yaml.loadYamlFile('./fixtures/topics.yml'),
    yaml.loadYamlFile('./fixtures/collections.yml'),
])
.then(([users, sources, topics, collections]) => {

    // Users
    return r.tableDrop('users').run()
        .catch(logAndProceed)
        .then(() => r.tableCreate('users').run())
        .then(() => r.table('users').indexCreate('createdAt').run())
        .then(() => r.table('users').indexCreate('email').run())
        .then(() => {
            console.log('loading users')
            return r.table('users').insert(users.map(user => {
                user.createdAt = r.now()

                return user
            }), { returnChanges: true }).run()
                .then(mapGeneratedIds(users))
        })
        .catch(logAndExit)

        // Sources
        .then(() => {
            return Promise.all(topics.filter(t => t.picture && t.picture !== '').map(topic => {
                return new Promise((resolve, reject) => {
                    fs.copy(`./fixtures/topics-pictures/${topic.picture}`, `./uploads/${topic.picture}`, err => {
                        if (err) {
                            return reject(err)
                        }

                        resolve(true)
                    })
                })
            }))
        })
        .catch(logAndExit)
        .then(() => r.tableDrop('sources').run())
        .catch(logAndProceed)
        .then(() => r.tableCreate('sources').run())
        .then(() => r.table('sources').indexCreate('createdAt').run())
        .then(() => {
            console.log('loading sources')
            return r.table('sources').insert(sources.map(source => {
                source.createdAt = r.now()
                if (source.user) {
                    source.user_id = _.find(users, { email: source.user }).id
                    delete source.user
                }

                return source
            }), { returnChanges: true }).run()
                .then(mapGeneratedIds(sources))
        })
        .catch(logAndExit)

        // Topics
        .then(() => r.tableDrop('topics').run())
        .catch(logAndProceed)
        .then(() => r.tableCreate('topics').run())
        .then(() => {
            console.log('loading topics')
            return r.table('topics').insert(topics.map(topic => {
                topic.createdAt = r.now()
                if (topic.user) {
                    topic.user_id = _.find(users, { email: topic.user }).id
                    delete topic.user
                }
                if (topic.sources) {
                    topic.sources = topic.sources.map(name => _.find(sources, { name }).id)
                }

                return topic
            }), { returnChanges: true }).run()
                .then(mapGeneratedIds(topics))
        })
        .catch(logAndExit)

        // Collections
        .then(() => r.tableDrop('collections').run())
        .catch(logAndProceed)
        .then(() => r.tableCreate('collections').run())
        .then(() => r.table('collections').indexCreate('createdAt').run())
        .then(() => {
            console.log('loading collections')
            return r.table('collections').insert(collections.map(collection => {
                collection.createdAt = r.now()
                if (collection.user) {
                    collection.user_id = _.find(users, { email: collection.user }).id
                    delete collection.user
                }

                return collection
            })).run()
                .then(mapGeneratedIds(collections))
        })
})
.then(() => {
    r.getPoolMaster().drain()
})
.catch(logAndExit)
