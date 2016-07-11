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
            sources: r.table('sources').filter(source => source('topics').contains(id)).coerceTo('array'),
        })),
        null
    ))
    .run()
