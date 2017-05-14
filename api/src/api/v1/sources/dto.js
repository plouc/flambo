const _     = require('lodash')

const Media = require('../../../modules/media')


exports.item = source => {
    if (!source) return source

    if (source.owner) {
        source.owner = Object.assign(_.omit(source.owner, 'avatar'), {
            avatar_url: source.owner.avatar ? Media.getMediumUrl(source.owner.avatar) : null,
        })
    }

    return source
}

exports.collection = collection => collection.map(exports.item)
