/**
 * @module repositories/CollectionsRepository
 */
'use strict'

const container = require('../container')
const r         = container.get('rethinkdb')


/**
 * Returns all collections.
 *
 * @returns {Promise.<Array.<Collection>, Error>} A promise for the collections
 */
module.exports.findAll = () => r.table('collections')
    .orderBy(r.desc('createdAt'))
    .run()


module.exports.findByUserId = userId => r.table('collections')
    .filter({ user_id: userId })
    .orderBy(r.desc('createdAt'))
    .run()

/**
 * Find a topic by its id.
 *
 * @param {string} id - The topic id
 * @returns {Promise.<Collection|null, Error>} A promise for the collection, resolved with null if not found
 */
module.exports.find = id => r.table('collections').get(id).run()


module.exports.addNewsItem = (id, newsItemId) => r.table('collections')
    .get(id)
    .update({
        news_items: r.row('news_items').append(newsItemId).distinct(),
    })
    .run()

module.exports.removeNewsItem = (id, newsItemId) => r.table('collections')
    .get(id)
    .update({
        news_items: r.row('news_items').filter(item => item.ne(newsItemId)),
    })
    .run()