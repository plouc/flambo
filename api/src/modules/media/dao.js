const db = require('../../core/database')


exports.columns = [
    'id',
    'filename',
    'mimetype',
    'path',
]

exports.find = ({ offset, limit, query = {} } = {}) => {
    return db.from('media')
        .modify(qb => {
            if (limit  !== undefined) qb.limit(limit)
            if (offset !== undefined) qb.offset(offset)

            Object.keys(query).forEach(key => {
                qb.where(key, query[key])
            })
        })
}

exports.findOne = ({ query = {} } = {}) => {
    return exports.find({ limit: 1, query })
        .then(([row]) => row)
}

exports.create = medium => {
    return db('media')
        .returning('*')
        .insert(medium)
        .then(([m]) => m)
}

exports.update = (id, data) => {
    return db('media')
        .where('id', id)
        .returning('*')
        .update(data)
}
