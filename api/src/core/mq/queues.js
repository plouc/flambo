const _        = require('lodash')
const sqs      = require('./client')
const messages = require('./messages')


exports.create = (QueueName, _params = {}) => {
    return new Promise((resolve, reject) => {
        const params = Object.assign({ QueueName }, _params)

        sqs.createQueue(params, (err, data) => {
            if (err) return reject(err)
            resolve(data.QueueUrl)
        })
    })
}

exports.list = (params = {}) => new Promise((resolve, reject) => {
    sqs.listQueues(params, (err, data) => {
        if (err) return reject(err)
        resolve(data.QueueUrls)
    })
})

exports.getUrl = QueueName => new Promise((resolve, reject) => {
    const params = { QueueName }

    sqs.getQueueUrl(params, (err, data) => {
        if (err) return reject(err)
        resolve(data.QueueUrl)
    })
})

exports.delete = QueueUrl => new Promise((resolve, reject) => {
    const params = { QueueUrl }

    sqs.deleteQueue(params, err => {
        if (err) return reject(err)
        resolve(true)
    })
})

exports.deleteByName = name => {
    return exports.getUrl(name)
        .then(exports.delete)
}

exports.get = name => {
    return exports.getUrl(name)
        .then(url => ({
            delete: _.partial(exports.delete, url),
            send:   _.partial(messages.send, url),
        }))
}
