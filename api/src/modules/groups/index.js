const dbHelpers = require('../../core/database/helpers')
const dao       = require('./dao')


exports.all = dao.find

exports.get = (id, viewerId) => dao.findOne({ query: { id }, viewerId })

exports.getGroupSourceIds = id => {
    return dao.findSourceIds(id)
        .then(ids => ids.map(({ id }) => id))
}

exports.create = group => {
    return dao.create(dbHelpers.uuid(group))
}

exports.update = dao.update

exports.addMember = dao.createMembership

exports.removeMember = dao.deleteMembership
