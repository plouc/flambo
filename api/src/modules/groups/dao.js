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

exports.find = ({
    offset, limit, query = {}, viewerId,
} = {}) => {
    const nesting = nest('groups', exports.columns, { extra: ['members_count'] })
        .one('picture', Media.dao.columns)
        .one('owner',   Users.dao.relatedColumns)
        .one('avatar',  Media.dao.columns, { parent: 'owner' })

    if (viewerId !== undefined) {
        nesting.one('own_membership', ['group_id', 'user_id', 'is_administrator'])
    }

    return db.from('groups')
        .select(nesting.selection())
        .countDistinct('members AS members_count')
        .modify(qb => {
            if (limit  !== undefined) qb.limit(limit)
            if (offset !== undefined) qb.offset(offset)

            Object.keys(query).forEach(key => {
                qb.where(`groups.${key}`, query[key])
            })

            const groupBy = ['groups.id', 'picture.id', 'owner.id', 'avatar.id']

            if (viewerId) {
                qb.leftJoin('users_groups as own_membership', function () {
                    this.on('own_membership.group_id', '=', 'groups.id')
                        .andOn('own_membership.user_id', db.raw('?', [viewerId]))
                })
                groupBy.push('own_membership.group_id')
                groupBy.push('own_membership.user_id')
                groupBy.push('own_membership.is_administrator')
            }

            qb.groupBy(groupBy)
        })
        .leftJoin('users as owner', 'owner.id', 'groups.owner_id')
        .leftJoin('media as avatar', 'avatar.id', 'owner.avatar_id')
        .leftJoin('media as picture', 'picture.id', 'groups.picture_id')
        .leftJoin('users_groups as members', 'members.group_id', 'groups.id')
        .orderBy('groups.name')
        .then(nesting.rollup.bind(nesting))
}


exports.findOne = ({ query = {}, viewerId } = {}) => {
    return exports.find({ limit: 1, query, viewerId })
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
