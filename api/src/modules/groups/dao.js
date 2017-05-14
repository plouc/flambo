const db    = require('../../core/database')
const nest  = require('../../core/database/nest')
const Media = require('../media')
const Users = require('../users')


exports.columns = [
    'id',
    'name',
    'slug',
    'description',
    'created_at',
    'updated_at',
]

exports.find = ({ offset, limit, query = {} } = {}) => {
    const nesting = nest('groups', exports.columns, { extra: ['members'] })
        .one('picture', Media.dao.columns)
        .one('owner',   Users.dao.relatedColumns)
        .one('avatar',  Media.dao.columns, { parent: 'owner' })

    return db.from('groups')
        .select(nesting.selection())
        .count('members AS members')
        .modify(qb => {
            if (limit  !== undefined) qb.limit(limit)
            if (offset !== undefined) qb.offset(offset)

            Object.keys(query).forEach(key => {
                qb.where(`groups.${key}`, query[key])
            })
        })
        .leftJoin('users as owner', 'owner.id', 'groups.owner_id')
        .leftJoin('media as avatar', 'avatar.id', 'owner.avatar_id')
        .leftJoin('media as picture', 'picture.id', 'groups.picture_id')
        .leftJoin('users_groups as members', 'members.group_id', 'groups.id')
        .groupBy('groups.id', 'picture.id', 'owner.id', 'avatar.id')
        .orderBy('groups.name')
        .then(nesting.rollup.bind(nesting))
}

exports.findOne = ({ query = {} } = {}) => {
    return exports.find({ limit: 1, query })
        .then(([row]) => row)
}

exports.create = group => {
    return db('groups')
        .returning('*')
        .insert(group)
        .then(([g]) => g)
}

exports.update = (id, data) => {
    return db('groups')
        .where('id', id)
        .returning('*')
        .update(data)
}

exports.findSourceIds = groupId => {
    return db.from('groups')
        .select('groups_sources.source_id AS id')
        .innerJoin('groups_sources', 'groups_sources.group_id', 'groups.id')
        .where('groups.id', groupId)
}

exports.createMembership = (groupId, userId) => {
    return db('users_groups')
        .returning('*')
        .insert({
            group_id: groupId,
            user_id:  userId,
        })
        .then(([m]) => m)
}

exports.deleteMembership = (groupId, userId) => {
    return db('users_groups')
        .where({
            group_id: groupId,
            user_id:  userId,
        })
        .del()
}
