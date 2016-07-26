'use strict'

const login  = require('./loginSchema')
const source = require('./sourceSchema')
const topic  = require('./topicSchema')
const user   = require('./userSchema')


module.exports = {
    login,
    source,
    topic,
    user,
}