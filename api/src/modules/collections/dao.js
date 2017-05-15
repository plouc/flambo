const db    = require('../../core/database')
const nest  = require('../../core/database/nest')
const Media = require('../media')
const Users = require('../users')


exports.columns = [
    'id',
    'name',
    'description',
    'selection',
    'public',
    'created_at',
    'updated_at',
]

exports.find = ({
    offset, limit, query = {}, viewerId,
} = {}) => {
    const nesting = nest('collections', exports.columns, { extra: ['subscribers_count'] })
        .one('picture', Media.dao.columns)
        .one('owner', Users.dao.relatedColumns)
        .one('avatar', Media.dao.columns, { parent: 'owner' })

    if (viewerId !== undefined) {
        nesting.one('own_subscription', ['collection_id', 'user_id', 'is_contributor'])
    }

    const queryKeys = Object.keys(query)

    return db.from('collections')
        .select(nesting.selection())
        .countDistinct('subscribers AS subscribers_count')
        .modify(qb => {
            if (limit  !== undefined) qb.limit(limit)
            if (offset !== undefined) qb.offset(offset)

            const groupBy = ['collections.id', 'picture.id', 'owner.id', 'avatar.id']

            const hasOwnerFilter = !!queryKeys.find(key => key.startsWith('owner'))
            qb[hasOwnerFilter ? 'innerJoin' : 'leftJoin']('users AS owner', 'owner.id', 'collections.owner_id')

            const hasSubscriptionFilter = !!queryKeys.find(key => key.startsWith('subscription'))
            if (hasSubscriptionFilter) {
                qb.innerJoin('collections_subscribers AS subscription', 'subscription.collection_id', 'collections.id')
            }

            if (viewerId) {
                qb.leftJoin('collections_subscribers as own_subscription', function () {
                    this.on('own_subscription.collection_id', '=', 'collections.id')
                        .andOn('own_subscription.user_id', db.raw('?', [viewerId]))
                })
                groupBy.push('own_subscription.collection_id')
                groupBy.push('own_subscription.user_id')
                groupBy.push('own_subscription.is_contributor')
            }

            queryKeys.filter(key => !key.includes('.'))
                .forEach(key => {
                    qb.where(`collections.${key}`, query[key])
                })

            queryKeys.filter(key => key.includes('.'))
                .forEach(key => {
                    qb.where(key, query[key])
                })

            qb.groupBy(groupBy)
        })
        .orderBy('collections.name')
        .leftJoin('collections_subscribers AS subscribers', 'subscribers.collection_id', 'collections.id')
        .leftJoin('media AS avatar',  'avatar.id',  'owner.avatar_id')
        .leftJoin('media AS picture', 'picture.id', 'collections.picture_id')
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

exports.createSubscription = (collectionId, userId) => {
    return db('collections_subscribers')
        .returning('*')
        .insert({
            collection_id: collectionId,
            user_id:       userId,
        })
        .then(([s]) => s)
}

exports.deleteSubscription = (collectionId, userId) => {
    return db('collections_subscribers')
        .where({
            collection_id: collectionId,
            user_id:       userId,
        })
        .del()
}
