/**
 * @module repositories/TopicsRepository
 */
'use strict'

const container = require('../container')
const r         = container.get('rethinkdb')


/**
 * Returns all topics.
 *
 * @returns {Promise.<Array.<Topic>, Error>} A promise for the topics
 */
module.exports.findAll = () => r.table('topics')
    .orderBy(r.desc('createdAt'))
    .run()

/**
 * Find a topic by its id.
 *
 * @param {string} id - The topic id
 * @returns {Promise.<Topic|null, Error>} A promise for the topic, resolved with null if not found
 */
module.exports.find = id => r.table('topics').get(id).run()

/**
 * Find a topic by its id and join matching sources.
 *
 * @param {string} id - The topic id
 * @returns {Promise.<Topic|null, Error>} A promise for the topic, resolved with null if not found
 */
module.exports.findWithSources = id => r.table('topics')
    .get(id)
    .do(topic => r.branch(
        topic,
        topic.merge(() => ({
            sources: r.table('sources').filter(source => topic('sources').contains(source('id'))).coerceTo('array'),
        })),
        null
    ))
    .run()

module.exports.insert = topic => {
    if (!topic.createdAt) {
        topic.createdAt = r.now()
    }

    return r.table('topics')
        .insert(topic, { returnChanges: true })
        .run()
        .then(result => result.changes[0].new_val)
}

module.exports.update = (id, topic) => {
    return r.table('topics')
        .get(id)
        .update(topic, { returnChanges: true })
        .run()
        .then(result => result.changes.length > 0 ? result.changes[0].new_val : topic)
}

module.exports.delete = id => {
    return r.table('topics')
        .get(id)
        .delete()
        .run()
}
