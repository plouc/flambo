const partialRight = require('lodash/partialRight')
const modules      = require('./modules')

/**
 * @typedef {Object} ClientOptions
 * @property {string} [apiUrl='http://localhost:7000/api/v1']
 * @property {string} token
 * @property {Object} [headers={}]
 */

Object.keys(modules).forEach(moduleId => {
    const module = modules[moduleId]
    exports[moduleId] = module
})

/**
 * @method init
 * @param {ClientOptions} options
 * @return {{collections, groups, sources, users}}
 */
exports.client = (options = {}) => {
    const api = {}
    Object.keys(modules).forEach(moduleId => {
        const module = modules[moduleId]

        const boundModule = {}
        Object.keys(module).forEach(method => {
            boundModule[method] = partialRight(module[method], options)
        })

        api[moduleId] = boundModule
    })

    return api
}
