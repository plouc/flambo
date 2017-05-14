const elasticsearch = require('elasticsearch')
const config        = require('../config')


const client = new elasticsearch.Client({
    host: `${config.get('elastic.host')}:${config.get('elastic.port')}`,
    log:  config.get('elastic.log'),
})

module.exports = client
