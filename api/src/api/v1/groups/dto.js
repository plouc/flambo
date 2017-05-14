const _     = require('lodash')

const Media = require('../../../modules/media')


exports.item = group => {
    if (!group) return group

    if (group.owner) {
        group.owner = Object.assign(_.omit(group.owner, 'avatar'), {
            avatar_url: group.owner.avatar ? Media.getMediumUrl(group.owner.avatar) : null,
        })
    }

    group.members = Number(group.members)

    group.picture_url = group.picture ? Media.getMediumUrl(group.picture) : null

    return _.omit(group, 'picture')
}

exports.collection = collection => collection.map(exports.item)


exports.comment = comment => {
    if (!comment) return comment

    if (comment.author) {
        comment.author = Media.appendRelatedMediumUrl(comment.author, 'avatar')
    }

    return comment
}

exports.comments = comments => comments.map(exports.comment)


exports.member = member => {
    if (!member) return member

    member.joined_at        = member.membership.created_at
    member.is_administrator = member.membership.is_administrator

    return Media.appendRelatedMediumUrl(_.omit(member, 'membership'), 'avatar')
}

exports.members = members => members.map(exports.member)