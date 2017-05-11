const dbHelpers = require('../../core/database/helpers')
const dao       = require('./dao')


exports.all = ({ limit, offset }) => {
    return dao.find({ limit, offset })
}

exports.get = id => dao.findOne({ query: { id } })

exports.create = group => {
    return dao.create(dbHelpers.uuid(group))
}

exports.update = dao.update

exports.addMember = dao.createMembership

exports.removeMember = dao.deleteMembership
