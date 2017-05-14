const db = require('../../core/database')


exports.resolveGroups = (_, {
    orderBy = { field: 'name', direction: 'asc' },
}) => {
    return db.from('groups')
        .select(['groups.*'])
        .orderBy(orderBy.field, orderBy.direction)
}

exports.resolveGroup = (_, { id }) => {
    return db.from('groups')
        .where('id', id)
        .then(([group]) => group)
}

exports.resolveUserGroups = (user, args, ctx) => {
    return db.from('groups')
        .select([
            'groups.*',
            'users_groups.is_administrator AS member_is_administrator',
        ])
        .innerJoin('users_groups', 'users_groups.group_id', 'groups.id')
        .where('users_groups.user_id', user.id)
}
