const _         = require('lodash')

const db        = require('../../core/database')
const dbHelpers = require('../../core/database/helpers')
const nest      = require('../../core/database/nest')
const dao       = require('./dao')


exports.dao = dao

exports.all = ({ limit, offset }) => {
    return dao.find({ limit, offset })
}

exports.userCount = dao.total

exports.allByGroup = (groupId, { limit, offset }) => {
    return dao.findByGroupId(groupId, { limit, offset })
}

exports.allByCollection = (collectionId, { limit, offset }) => {
    return dao.findByCollectionId(collectionId, { limit, offset })
}

exports.get = id => dao.findOne({ query: { 'users.id': id } })

exports.create = async function (_user) {
    const user   = dbHelpers.uuid(_.omit(_user, ['groups']))
    const groups = _user.groups

    return db.transaction(trx => {
        return trx.insert(user, '*').into('users')
            .then(([createdUser]) => {
                if (groups.length === 0) return createdUser

                return Promise.all(groups.map(group => trx.insert({
                    user_id:  createdUser.id,
                    group_id: group,
                }).into('users_groups')))
                    .then(() => Object.assign(createdUser, { groups }))
            })
    })
}