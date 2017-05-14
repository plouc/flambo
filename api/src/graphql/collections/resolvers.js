const db = require('../../core/database')


exports.resolveCollections = (_, {
    orderBy = { field: 'name', direction: 'asc' },
}) => {
    return db.from('collections')
        .select(['collections.*'])
        .orderBy(orderBy.field, orderBy.direction)
}

exports.resolveCollection = (_, { id }) => {
    return db.from('collections')
        .where('id', id)
        .then(([collection]) => collection)
}

exports.resolveUserCollections = (user, args, ctx) => {
    return db.from('collections')
        .select([
            'collections.*',
        ])
        .where('collections.owner_id', user.id)
}
