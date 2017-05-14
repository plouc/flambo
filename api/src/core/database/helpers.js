const _    = require('lodash')
const uuid = require('uuid')


exports.prefix = (table, columns) => columns.map(column => {
    return `${table}.${column} AS ${table}__${column}`
})

exports.extractWithPrefix = (data, _prefix) => {
    const prefix = `${_prefix}__`

    return _.mapKeys(
        _.pickBy(data, (v, k)  => k.startsWith(prefix)),
        (v, k) => k.slice(prefix.length)
    )
}

exports.extractWithPrefixes = (data, prefixes) => {
    return prefixes.reduce((result, prefix) => {
        return Object.assign(result, {
            [prefix]: exports.extractWithPrefix(data, prefix)
        })
    }, {})
}

exports.uuid  = item  => Object.assign(item, { id: uuid.v4() })
exports.uuids = items => items.map(exports.uuid)