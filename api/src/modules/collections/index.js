const db        = require('../../core/database')
const dbHelpers = require('../../core/database/helpers')
const dao       = require('./dao')


exports.all = ({ limit, offset, query }) => {
    return dao.find({ limit, offset, query })
}

exports.get = id => dao.findOne({ query: { id } })

exports.create = async collection => {
    return db('collections')
        .returning('*')
        .insert(dbHelpers.uuid(collection))
}

exports.addSubscriber = dao.createSubscription

exports.removeSubscriber = dao.deleteSubscription
