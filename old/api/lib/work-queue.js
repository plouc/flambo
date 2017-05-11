const getQueue = (container, queueName) => {
    const amqpConnect = container.get('amqp')

    let connection
    let channel

    return amqpConnect
        .then(_connection => {
            connection = _connection

            return connection.createChannel()
        })
        .then(_channel => {
            channel = _channel

            return channel.assertQueue(queueName, { durable: true })
        })
        .then(() => ({ connection, channel }))
}

const queueName = 'collect'

exports.getProducer = container => getQueue(container, queueName)
    .then(({ connection, channel }) => {
        return {
            send: message => {
                return Promise.resolve(channel.sendToQueue(queueName, new Buffer(message), { persistent: true }))
            },
            terminate: () => {
                return channel.close().then(() => connection.close())
            },
        }
    })

exports.getConsumer = container => getQueue(container, queueName)
    .then(({ connection, channel }) => {
        channel.prefetch(1)

        return {
            consume: handler => {
                channel.consume(
                    queueName,
                    message => handler(message, () => channel.ack(message)),
                    { noAck: false }
                )
            },
            terminate: () => {
                return channel.close().then(() => connection.close())
            },
        }
    })
