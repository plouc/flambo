const db        = require('../../core/database')
const dbHelpers = require('../../core/database/helpers')


exports.all = async ({
    limit, offset,
}) => {
    return db.from('groups')
        .modify(qb => {
            if (limit  !== undefined) qb.limit(limit)
            if (offset !== undefined) qb.offset(offset)
        })
        .orderBy('name')
}

exports.get = async id => {
    return db.from('groups')
        .where('id', id)
        .then(([group]) => group)
}

exports.create = async group => {
    return db('groups')
        .returning('*')
        .insert(dbHelpers.uuid(group))
}
