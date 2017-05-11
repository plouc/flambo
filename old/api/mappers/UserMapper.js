'use strict'

const _        = require('lodash')
const gravatar = require('gravatar')


const appendGravatarUrl = user => Object.assign({}, user, {
    gravatarUrl: gravatar.url(user.email, { protocol: 'https' })
})

const mapUser = user => {
    return appendGravatarUrl(_.omit(user, ['password']))
}

const mapUsers = users => users.map(module.exports.mapUser)


module.exports.mapUser  = mapUser
module.exports.mapUsers = mapUsers