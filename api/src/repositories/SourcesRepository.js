/**
 * @module repositories/SourcesRepository
 */
'use strict'

const container = require('../container')
const r         = container.get('rethinkdb')

/**
 * Returns all sources.
 *
 * @returns {Promise.<Array.<Source>, Error>} A promise for the sources
 */
module.exports.findAll = () => r.table(TABLE_NAME).run()

module.exports.findAllWithTopics = () => r.table('sources')
    .outerJoin(r.table('topics'), (source, topic) => source('topics').default([]).contains(topic('id')))
    .group(row => row('left')('id'))
    .ungroup()
    .map(group => {
        const source = group('reduction').nth(0)('left')

        return source.merge(r.branch(
            source('topics').default([]).isEmpty(),
            { topics: [] },
            { topics: group('reduction').map(pair => pair('right')) }
        ))
    })
    .orderBy(r.desc('createdAt'))
    .run()

/**
 * Find a source by its id.
 *
 * @param {string} id - The source id
 * @returns {Promise.<Source|null, Error>} A promise for the source, resolved with null if not found
 */
module.exports.find = id => r.table('sources').get(id).run()

/**
 * Find a source by its id and join matching topics.
 *
 * @param {string} id - The source id
 * @returns {Promise.<Source|null, Error>} A promise for the source, resolved with null if not found
 */
module.exports.findWithTopics = id => r.table('sources')
    .get(id)
    .do(source => r.branch(
        source,
        source.merge(source => ({
            topics: r.table('topics').filter(theme => source('topics').contains(theme('id'))).coerceTo('array'),
        })),
        null
    ))
