const db        = require('../../core/database')
const dbHelpers = require('../../core/database/helpers')


exports.all = async ({
    limit, offset,
}) => {
    return db.from('collections')
        .modify(qb => {
            if (limit  !== undefined) qb.limit(limit)
            if (offset !== undefined) qb.offset(offset)
        })
        .orderBy('name')
}

exports.get = async id => {
    return db.from('collections')
        .where('id', id)
        .then(([collection]) => collection)
}

exports.create = async collection => {
    return db('collections')
        .returning('*')
        .insert(dbHelpers.uuid(collection))
}
