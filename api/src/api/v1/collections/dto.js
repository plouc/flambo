const _     = require('lodash')

const Media = require('../../../modules/media')


exports.collection = collection => {
    if (!collection) return collection

    if (collection.owner) {
        collection.owner = Media.appendRelatedMediumUrl(collection.owner, 'avatar')
    }

    collection.subscribers_count = Number(collection.subscribers_count)

    return Media.appendRelatedMediumUrl(collection, 'picture')
}

exports.collections = collection => collection.map(exports.collection)


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