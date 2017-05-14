const db = require('../../core/database')


exports.resolveSources = (_, {
    orderBy = { field: 'name', direction: 'asc' },
}) => {
    return db.from('sources')
        .select(['sources.*'])
        .orderBy(orderBy.field, orderBy.direction)
}

exports.resolveSource = (_, { id }) => {
    return db.from('sources')
        .where('id', id)
        .then(([source]) => source)
}
