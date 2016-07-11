const dotenv = require('dotenv')

dotenv.config({ silent: true })

const container = require('./src/container')

const r = container.get('rethinkdb')

r.dbCreate(container.get('rethinkdb_db')).run()
    .then(() => {
        r.getPoolMaster().drain()
    })
    .error(err => {
        console.log(err)
        process.exit(1)
    })
