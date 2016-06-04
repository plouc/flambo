const dotenv = require('dotenv');

dotenv.config({ silent: true });

const container = require('./src/container');

const topics  = require('./fixtures/topics');
const users   = require('./fixtures/users');
const sources = require('./fixtures/sources');

const r = container.get('rethinkdb');

const util = require('util');

r.table('themes').delete().run()
    .then(() => {
        console.log('loading themes');
        return r.table('themes').insert(themes.map(theme => {
            theme.createdAt = r.now();

            return theme;
        }), { returnChanges: true }).run()
            .then(res => {
                console.log(util.inspect(res, { depth: null, colors: true }));
            })
        ;
    })
    .then(() => {
        return r.table('users').delete().run()
    })
    .then(() => {
        console.log('loading users');
        return r.table('users').insert(users.map(user => {
            user.createdAt = r.now();

            return user;
        })).run();
    })
    .then(() => {
        return r.table('sources').delete().run()
    })
    .then(() => {
        console.log('loading sources');
        return r.table('sources').insert(sources.map(source => {
            source.createdAt = r.now();

            return source;
        })).run();
    })
    .then(() => {
        r.getPoolMaster().drain();
    })
    .error(err => {
        console.log(err);
        process.exit(1);
    })
;