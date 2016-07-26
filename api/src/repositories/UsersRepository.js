/**
 * @module repositories/UsersRepository
 */
'use strict'

const container = require('../container')
const r         = container.get('rethinkdb')


/**
 * Returns all users.
 *
 * @returns {Promise.<Array.<Topic>, Error>} A promise for the users
 */
module.exports.findAll = () => r.table('users')
    .orderBy('name')
    .run()

/**
 * Find a user by its id.
 *
 * @param {string} id - The user id
 * @returns {Promise.<Topic|null, Error>} A promise for the user, resolved with null if not found
 */
module.exports.find = id => r.table('users').get(id).run()


module.exports.findByEmail = email => {
    return r.table('users')
        .getAll(email, { index: 'email' })
        .limit(1)
        .run()
        .then(([user = null]) => user)
}

module.exports.incrementLoginAttempts = id => {
    return r.table('users')
        .get(id)
        .update({ loginAttempts: r.row('loginAttempts').add(1) })
        .run()
}

module.exports.loginSuccessUpdate = id => {
    return r.table('users')
        .get(id)
        .update({
            loginAttempts: 0,
            lastLogin:     r.now(),
        })
        .run()
}