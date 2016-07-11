'use strict'

/**
 * @module sources/SourceLoader
 */

const sourceLoaders = {};

/**
 * Register a new source loader.
 *
 * @param {string} id     - The loader identifier
 * @param {Object} loader - The loader
 * @returns {undefined}
 */
module.exports.registerLoader = (id, loader) => {
    sourceLoaders[id] = loader
}

/**
 * Register new source loaders.
 *
 * @param {Object} loaders - An object, each key will be used as loader id, and value as loader
 * @returns {undefined}
 */
module.exports.registerLoaders = loaders => {
    Object.keys(loaders).forEach(id => {
        module.exports.registerLoader(id, loaders[id])
    })
}

/**
 * Load data for given source.
 *
 * @param {string} sourceType - The source type, eg. 'twitter'
 * @param {Object} config     - The source config
 * @returns {*|void}
 */
module.exports.load = (sourceType, config) => {
    const sourceLoader = sourceLoaders[sourceType]

    return sourceLoader.load(config)
}

/**
 * Load data for multiple sources.
 *
 * @param {Array} sources - An array of sources
 * @returns {Promise.<Array, Error>}
 */
module.exports.batchLoad = sources => Promise.all(
    sources.map(source => {
        return module.exports.load(source.type, source.data)
            .then(results => {
                return results.map(result => {
                    result.sourceId   = source.id
                    result.sourceType = source.type

                    return result
                })
            })
        ;
    }))
    .then(results => [].concat.apply([], results))
