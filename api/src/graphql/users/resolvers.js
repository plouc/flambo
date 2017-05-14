const db = require('../../core/database')


exports.resolveUsers = (_, {
    orderBy = { field: 'last_name', direction: 'asc' },
}) => {
    return db.from('users')
        .select(['users.*'])
        .orderBy(orderBy.field, orderBy.direction)
}

exports.resolveUser = (_, { id }) => {
    return db.from('users')
        .where('id', id)
        .then(([user]) => user)
}

exports.resolveGroupOwner = (group) => {
    return db.from('users')
        .where('id', group.owner_id)
        .then(([user]) => user)
}
