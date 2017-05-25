const AWS = require('aws-sdk')


const sqsClient = new AWS.SQS({
    endpoint: 'http://localhost:4100',
    region: 'us-west',
})

module.exports = sqsClient
