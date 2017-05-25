const sqs = require('./client')


exports.send = (
    QueueUrl,
    MessageBody,
    MessageAttributes = {},
    _params = {}
) => {
    return new Promise((resolve, reject) => {
        const params = Object.assign({
            QueueUrl,
            MessageBody,
            MessageAttributes,
        }, _params)

        sqs.sendMessage(params, (err, data) => {
            if (err) return reject(err)

            resolve({
                id:            data.MessageId,
                bodyMd5:       data.MD5OfMessageBody,
                attributesMd5: data.MD5OfMessageAttributes,
            })
        })
    })
}

exports.receive = (QueueUrl, _params) => {

}