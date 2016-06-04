const express         = require('express');
const bodyParser      = require('body-parser');
const cors            = require('cors');
const app             = express();
const dotenv          = require('dotenv');
const WebSocketServer = require('uws').Server;

const Users           = require('./src/resources/UsersResource');
const Topics          = require('./src/resources/TopicsResource');
const newsItem        = require('./src/resources/newsItemResource');
const Sources         = require('./src/resources/SourcesResource');

dotenv.config({ silent: true });

const container = require('./src/container');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(`
        <ul>
            <li><a href="/api/v1/users">/api/v1/users</a></li>
            <li><a href="/api/v1/topics">/api/v1/topics</a></li>
            <li><a href="/api/v1/sources">/api/v1/sources</a></li>
        </ul>
    `);
});
app.use('/api/v1/users',      Users(container));
app.use('/api/v1/topics',     Topics(container));
app.use('/api/v1/sources',    Sources(container));
app.use('/api/v1/news_items', newsItem(container));

const server = app.listen(container.get('app_port'), () => {
    console.log(`app listening on port: ${container.get('app_port')}`);
});

const wss = new WebSocketServer({
    server,
    path: '/watch',
});

wss.on('connection', (ws) => {
    console.log('connected to watcher');

    const r = container.get('rethinkdb');
    r
        .table('users').merge({ type: 'users' })
        .union(r.table('topics').merge({ type: 'topics' }))
        .union(r.table('sources').merge({ type: 'sources' }))
        .changes().run((err, cursor) => {
            if (err) throw err;
            cursor.each((err, row) => {
                if (err) throw err;

                ws.send(JSON.stringify(row));

                console.log(row);
            })
        })
        .error((err) => {
            console.log(err);
        })
    ;

    /*
    ws.on('message', message => {
        console.log('message', message);
        //mozaik.bus.clientSubscription(clientId, JSON.parse(request));
    });

    ws.on('close', () => {
        console.log('bye');
        //mozaik.bus.removeClient(clientId);
    });
    */
});

