const db    = require('../../core/database')
const nest  = require('../../core/database/nest')
const Users = require('../users')
const Media = require('../media')


exports.columns = [
    'id',
    'type',
    'name',
    'description',
    'data',
    'created_at',
    'updated_at',
]

exports.find = ({ offset, limit, query = {} } = {}) => {
    const nesting = nest('sources', exports.columns)
        .one('owner',  Users.dao.relatedColumns)
        .one('avatar', Media.dao.columns, { parent: 'owner' })

    const queryKeys = Object.keys(query)

    return db.from('sources')
        .select(nesting.selection())
        .modify(qb => {
            if (limit  !== undefined) qb.limit(limit)
            if (offset !== undefined) qb.offset(offset)

            const hasGroupFilter = !!queryKeys.find(key => key.startsWith('group'))
            if (hasGroupFilter) {
                qb.innerJoin('groups_sources AS gs', 'gs.source_id', 'sources.id')
                qb.innerJoin('groups AS group', 'group.id', 'gs.group_id')
            }

            queryKeys.filter(key => !key.includes('.'))
                .forEach(key => {
                    qb.where(`sources.${key}`, query[key])
                })

            queryKeys.filter(key => key.includes('.'))
                .forEach(key => {
                    qb.where(key, query[key])
                })
        })
        .orderBy('sources.name')
        .leftJoin('users as owner', 'owner.id', 'sources.owner_id')
        .leftJoin('media as avatar', 'avatar.id', 'owner.avatar_id')
        .then(nesting.rollup.bind(nesting))
}

exports.findOne = ({ query = {} } = {}) => {
    return exports.find({ limit: 1, query })
        .then(([row]) => row)
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
