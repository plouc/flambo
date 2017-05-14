// Description:
//   List groups
//
// Commands:
//   flambo groups - list groups
//
// Author:
//   plouc
//
const client = require('flambo-api-client')


module.exports = bot => {
    bot.respond(/groups/i, msg => {
        client.groups.find()
            .then(({ items }) => {
                const header   = `*groups*`
                const response = items.reduce((agg, item) => {
                    return `${agg}• *${item.name}*${item.description ? `: ${item.description}` : ''} [${item.id}]\n`
                }, `${header}\n`)

                msg.send(response)
            })
    })

    bot.respond(/group ([a-z0-9-]+)$/i, msg => {
        const groupId = msg.match[1]

        client.groups.get(groupId)
            .then(group => {
                const response = [
                    `*${group.name}* group [${group.id}]`,
                ]
                if (group.description) {
                    response.push(group.description)
                }

                msg.send(response.join('\n'))
            })
    })

    bot.respond(/group ([a-z0-9-]+) feed/i, msg => {
        const groupId = msg.match[1]

        client.groups.feed(groupId)
            .then(({ items }) => {
                const header   = `*feed*`
                const response = items.reduce((agg, item) => {
                    return `${agg}• *${item.title}*: ${item.link}\n`
                }, `${header}\n`)

                msg.send(response)
            })
    })
}
