const jwt    = require('jsonwebtoken')

const config = require('../config')
const db     = require('../database')


module.exports = async (login, password) => {
    const user = await db.from('users')
        .where('email', login)
        .then(([u]) => u)

    const token = jwt.sign({
        id:   user.id,
        role: user.role,
    }, config.get('jwt.secret'))

    return { user, token }
}
