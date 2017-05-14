const dbHelpers = require('../../core/database/helpers')
const config    = require('../../core/config')
const dao       = require('./dao')


exports.dao = dao

exports.getMediumUrl = medium => {
    return `${config.get('static.base_url')}/${medium.path}`
}

exports.appendMediumUrl = medium => Object.assign(medium, {
    url: exports.getMediumUrl(medium),
})

exports.appendRelatedMediumUrl = (item, key) => {
    if (item[key]) item[key] = exports.appendMediumUrl(item[key])
    return item
}

exports.all = ({ limit, offset }) => {
    return dao.find({ limit, offset })
}

exports.get = id => dao.findOne({ query: { id } })

exports.create = medium => dao.create(dbHelpers.uuid(medium))
