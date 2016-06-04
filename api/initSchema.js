const dotenv = require('dotenv');

dotenv.config({ silent: true });

const container = require('./src/container');

const r = container.get('rethinkdb');

r.table('themes').run()
    .then(() => {
        console.log('Already setup');
        r.getPoolMaster().drain();
    })
    .error(() => {
        r.dbCreate(container.get('rethinkdb_db')).run()
            .then(() => {
                return r.tableCreate('themes').run();
            })
            .then(() => {
                return r.tableCreate('users').run();
            })
            .then(() => {
                return r.tableCreate('sources').run();
            })
            .then(() => {
                r.getPoolMaster().drain();
            })
        ;
    })
    .error(err => {
        console.log(err);
        process.exit(1);
    })
;