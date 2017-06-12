require('isomorphic-fetch')
const flambo = require('@flambo/api-client')


module.exports = flambo.client({
    apiUrl: process.env.API_URL,
    token:  process.env.API_TOKEN,
})
