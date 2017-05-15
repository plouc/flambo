const _     = require('lodash')

const Media = require('../../../modules/media')


exports.collection = (collection, viewerId) => {
    if (!collection) return collection

    collection.viewer_is_owner = false
    if (collection.owner !== null) {
        collection.viewer_is_owner = viewerId === collection.owner.id
        collection.owner = Object.assign(_.omit(collection.owner, 'avatar'), {
            avatar_url: collection.owner.avatar ? Media.getMediumUrl(collection.owner.avatar) : null,
        })
    }

    collection.subscribers_count = Number(collection.subscribers_count)
    collection.picture_url       = collection.picture ? Media.getMediumUrl(collection.picture) : null

    collection.viewer_is_subscriber  = false
    collection.viewer_is_contributor = false
    if (collection.own_subscription !== null) {
        collection.viewer_is_subscriber  = true
        collection.viewer_is_contributor = collection.own_subscription.is_contributor
    }

    return _.omit(collection, 'picture', 'own_subscription')
}

exports.collections = (collections, viewerId) => collections.map(collection => exports.collection(collection, viewerId))


exports.comment = comment => {
    if (!comment) return comment

    if (comment.author) {
        comment.author = Media.appendRelatedMediumUrl(comment.author, 'avatar')
    }

    return comment
}

exports.comments = comments => comments.map(exports.comment)


exports.subscriber = subscriber => {
    if (!subscriber) return subscriber

    subscriber.subscribed_at  = subscriber.subscription.created_at
    subscriber.is_contributor = subscriber.subscription.is_contributor

    return Media.appendRelatedMediumUrl(_.omit(subscriber, 'subscription'), 'avatar')
}

exports.subscribers = subscribers => subscribers.map(exports.subscriber)