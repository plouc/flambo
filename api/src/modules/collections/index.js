const db        = require('../../core/database')
const dbHelpers = require('../../core/database/helpers')
const dao       = require('./dao')


exports.all = dao.find

exports.get = (id, viewerId) => dao.findOne({ query: { id }, viewerId })

exports.create = async collection => {
    return db('collections')
        .returning('*')
        .insert(dbHelpers.uuid(collection))
}

exports.addSubscriber = dao.createSubscription

exports.removeSubscriber = dao.deleteSubscription
