const client = require('./index')

client.users.list()
    .then(res => console.log(res))