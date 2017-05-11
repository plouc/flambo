const Media = require('../../../modules/media')


exports.collection = collection => {
    if (!collection) return collection

    if (collection.owner) {
        collection.owner = Media.appendRelatedMediumUrl(collection.owner, 'avatar')
    }

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
