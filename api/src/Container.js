const Jimple        = require('jimple');
const elasticsearch = require('elasticsearch');
const rethinkdb     = require('rethinkdbdash');

const container = new Jimple();


container.set('app_port', process.env.APP_PORT);


container.set('elastic_host', process.env.ELASTIC_HOST);
container.set('elastic_port', process.env.ELASTIC_PORT);

container.set('elastic', (c) => {
    return new elasticsearch.Client({
        host: `${c.get('elastic_host')}:${c.get('elastic_port')}`,
        log:  'info'
    });
});


container.set('rethinkdb_host', process.env.RETHINKDB_HOST);
container.set('rethinkdb_port', process.env.RETHINKDB_PORT);
container.set('rethinkdb_auth_key', process.env.RETHINKDB_AUTH_KEY);
container.set('rethinkdb_db', process.env.RETHINKDB_DB);

container.set('rethinkdb', (c) => {
    return rethinkdb({
        host:    c.get('rethinkdb_host'),
        port:    c.get('rethinkdb_port'),
        authKey: c.get('rethinkdb_auth_key'),
        db:      c.get('rethinkdb_db')
    });
});


module.exports = container;