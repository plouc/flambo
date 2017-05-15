const _     = require('lodash')

const Media = require('../../../modules/media')


exports.user = user => {
    if (!user) return user

    user.groups = user.memberships.map(membership => {
        return Object.assign(
            _.omit(membership.group, 'picture'),
            {
                picture_url:      membership.group.picture ? Media.getMediumUrl(membership.group.picture) : null,
                is_administrator: membership.is_administrator,
            }
        )
    })

    return Object.assign(
        _.omit(user, 'avatar', 'memberships'),
        { avatar_url: user.avatar ? Media.getMediumUrl(user.avatar) : null }
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

