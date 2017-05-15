const _     = require('lodash')

const Media = require('../../../modules/media')


exports.group = (group, viewerId) => {
    group.viewer_is_owner = false
    if (group.owner) {
        group.viewer_is_owner = viewerId === group.owner.id
        group.owner = Object.assign(_.omit(group.owner, 'avatar'), {
            avatar_url: group.owner.avatar ? Media.getMediumUrl(group.owner.avatar) : null,
        })
    }

    group.members_count = Number(group.members_count)

    group.picture_url = group.picture ? Media.getMediumUrl(group.picture) : null

    group.viewer_is_member        = false
    group.viewer_is_administrator = false
    if (group.own_membership !== null) {
        group.viewer_is_member        = true
        group.viewer_is_administrator = group.own_membership.is_administrator
    }

    return _.omit(group, 'picture', 'own_membership')
}

exports.groups = (groups, viewerId) => groups.map(group => exports.group(group, viewerId))


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