const dbHelpers = require('../../core/database/helpers')
const dao       = require('./dao')


exports.all = dao.find

exports.groupComments = (groupId, { limit, offset }) => {
    return dao.find({
        limit, offset,
        query: { 'group.id': groupId },
    })
}

exports.create = comment => {
    return dao.create(dbHelpers.uuid(comment))
}
