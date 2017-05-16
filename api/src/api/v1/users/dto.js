const _     = require('lodash')

const Media = require('../../../modules/media')


exports.user = user => {
    return Object.assign(
        _.omit(user, 'avatar'),
        {
            avatar_url: user.avatar ? Media.getMediumUrl(user.avatar) : null,
        }
    )
}

exports.users = collection => collection.map(exports.user)


exports.comment = comment => {
    if (!comment) return comment

    if (comment.author) {
        comment.author = Media.appendRelatedMediumUrl(comment.author, 'avatar')
    }

    return comment
}

exports.comments = comments => comments.map(exports.comment)

