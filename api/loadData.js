const dotenv = require('dotenv')

dotenv.config({ silent: true })

const container = require('./src/container')

const topics      = require('./fixtures/topics')
const users       = require('./fixtures/users')
const sources     = require('./fixtures/sources')
const collections = require('./fixtures/collections')

const r = container.get('rethinkdb')

const util = require('util')

// Topics
r.tableDrop('topics').run()
    .catch(err => {})
    .then(() => r.tableCreate('topics'))
    .then(() => {
        console.log('loading topics')
        return r.table('topics').insert(topics.topics.map(topic => {
            topic.createdAt = r.now()

            return topic;
        }), { returnChanges: true }).run()
            .then(res => {
                //console.log(util.inspect(res, { depth: null, colors: true }));
            })
        ;
    })

    // Users
    .then(() => r.tableDrop('users').run())
    .catch(err => {})
    .then(() => r.tableCreate('users'))
    .then(() => {
        console.log('loading users')
        return r.table('users').insert(users.users.map(user => {
            user.createdAt = r.now()

            return user
        })).run();
    })

    // Sources
    .then(() => r.tableDrop('sources').run())
    .catch(err => {})
    .then(() => r.tableCreate('sources'))
    .then(() => r.table('sources').indexCreate('createdAt').run())
    .then(() => {
        console.log('loading sources')
        return r.table('sources').insert(sources.sources.map(source => {
            source.createdAt = r.now()

            return source
        })).run()
    })

    // Collections
    .then(() => r.tableDrop('collections').run())
    .catch(err => {})
    .then(() => r.tableCreate('collections'))
    .then(() => r.table('collections').indexCreate('createdAt').run())
    .then(() => {
        console.log('loading collections')
        return r.table('collections').insert(collections.collections.map(collection => {
            collection.createdAt = r.now()

            return collection
        })).run()
    })

    .then(() => {
        r.getPoolMaster().drain()
    })
    .error(err => {
        console.log(err)
        process.exit(1)
    })
