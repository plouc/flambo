const db    = require('../../core/database')
const nest  = require('../../core/database/nest')
const Media = require('../media')


exports.relatedColumns = [
    'id',
    'first_name',
    'last_name',
]

const userColumns = [
    'id',
    'first_name',
    'last_name',
    'email',
    'role',
    'intro',
    'created_at',
    'updated_at',
]

exports.find = ({
    offset, limit, after, query = {},
} = {}) => {
    const nesting = nest('users', userColumns)
        .one('avatar', Media.dao.columns)

    return db.from('users')
        .select(nesting.selection())
        .orderBy('users.last_name')
        .modify(qb => {
            if (after !== undefined) {
                qb.where('users.last_name', '>=', after.last_name)
                    .whereNot('users.id', after.id)
            } else if (offset !== undefined) {
                qb.offset(offset)
            }
            if (limit !== undefined) qb.limit(limit)

            Object.keys(query).forEach(key => {
                qb.where(key, query[key])
            })
        })
        .leftJoin('media AS avatar', 'users.avatar_id', 'avatar.id')
        .then(nesting.rollup.bind(nesting))
}

exports.findOne = ({ query = {} } = {}) => {
    return exports.find({ limit: 1, query })
        .then(([row]) => row)
}

exports.total = () => {
    return db.from('users')
        .count('* AS total')
        .then(([{ total }]) => Number(total))
}

exports.findByGroupId = (id, { offset, limit, query = {} } = {}) => {
    const nesting = nest('users', exports.relatedColumns)
        .one('avatar', Media.dao.columns)
        .one('membership', ['created_at', 'is_administrator'])

    return db.from('users')
        .select(nesting.selection())
        .modify(qb => {
            if (limit  !== undefined) qb.limit(limit)
            if (offset !== undefined) qb.offset(offset)
        })
        .innerJoin('users_groups as membership', 'membership.user_id', 'users.id')
        .leftJoin('media AS avatar', 'users.avatar_id', 'avatar.id')
        .where('membership.group_id', id)
        .orderBy('users.last_name')
        .then(nesting.rollup.bind(nesting))
}

exports.findByCollectionId = (id, { offset, limit, query = {} } = {}) => {
    const nesting = nest('users', exports.relatedColumns)
        .one('avatar', Media.dao.columns)
        .one('subscription', ['created_at', 'is_contributor'])

    return db.from('users')
        .select(nesting.selection())
        .modify(qb => {
            if (limit  !== undefined) qb.limit(limit)
            if (offset !== undefined) qb.offset(offset)
        })
        .innerJoin('collections_subscribers as subscription', 'subscription.user_id', 'users.id')
        .leftJoin('media AS avatar', 'users.avatar_id', 'avatar.id')
        .where('subscription.collection_id', id)
        .then(nesting.rollup.bind(nesting))
}

exports.create = source => {
    return db('sources')
        .returning('*')
        .insert(source)
        .then(([s]) => s)
}

exports.update = (id, data) => {
    return db('sources')
        .where('id', id)
        .returning('*')
        .update(data)
}
