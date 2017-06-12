// Description:
//   List collections
//
// Configuration:
//   API_URL
//   API_TOKEN
//
// Commands:
//   flambo collections - list collections
//
// Author:
//   plouc
//
const columnify = require('columnify')
const client = require('../client')


module.exports = bot => {
    bot.respond(/collections/i, msg => {
        client.collections.find({})
            .then(({ items }) => {
                const response = columnify(
                    items.map(collection => ({
                        name:  collection.name,
                        owner: `${collection.owner.last_name} ${collection.owner.first_name}`,
                        id:    collection.id,
                    })),
                    { columnSplitter: '   ' }
                )

                msg.send('```' + response + '```')
            })
    })
}
