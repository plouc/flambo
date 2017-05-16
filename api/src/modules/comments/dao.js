const db    = require('../../core/database')
const nest  = require('../../core/database/nest')
const Media = require('../media')
const Users = require('../users')


exports.columns = [
    'id',
    'serial',
    'content',
    'created_at',
    'updated_at',
]

exports.find = ({ offset, limit, after, query = {} } = {}) => {
    const nesting = nest('comments', exports.columns)
        .one('author', Users.dao.relatedColumns)
        .one('avatar', Media.dao.columns, { parent: 'author' })
        .one('group', ['id', 'name'])
        .one('group_picture', Media.dao.columns, { parent: 'group' })
        .one('collection', ['id', 'name'])
        .one('collection_picture', Media.dao.columns, { parent: 'collection' })

    const queryKeys = Object.keys(query)

    return db.from('comments')
        .select(nesting.selection())
        .modify(qb => {
            if (after !== undefined) {
                qb.where(`comments.serial`, '<', after.serial)
            } else if (offset !== undefined) {
                qb.offset(offset)
            }
            if (limit !== undefined) qb.limit(limit)

            const hasAuthorFilter = !!queryKeys.find(key => key.startsWith('author'))
            qb[hasAuthorFilter ? 'innerJoin' : 'leftJoin']('users as author', 'author.id', 'comments.author_id')

            const hasGroupFilter = !!queryKeys.find(key => key.startsWith('group'))
            qb[hasGroupFilter ? 'innerJoin' : 'leftJoin']('groups as group', 'group.id', 'comments.group_id')

            const hasCollectionFilter = !!queryKeys.find(key => key.startsWith('collection'))
            qb[hasCollectionFilter ? 'innerJoin' : 'leftJoin']('collections as collection', 'collection.id', 'comments.collection_id')

            queryKeys.filter(key => !key.includes('.'))
                .forEach(key => {
                    qb.where(`comments.${key}`, query[key])
                })

            queryKeys.filter(key => key.includes('.'))
                .forEach(key => {
                    qb.where(key, query[key])
                })
        })
        .leftJoin('media as avatar', 'avatar.id', 'author.avatar_id')
        .leftJoin('media as group_picture', 'group_picture.id', 'group.picture_id')
        .leftJoin('media as collection_picture', 'collection_picture.id', 'collection.picture_id')
        .orderBy('comments.serial', 'desc')
        .then(nesting.rollup.bind(nesting))
}

exports.findOne = ({ query = {} } = {}) => {
    return exports.find({ limit: 1, query })
        .then(([row]) => row)
}

exports.create = comment => {
    return db('comments')
        .returning('*')
        .insert(comment)
        .then(([c]) => c)
}
