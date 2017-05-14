const db = require('../../core/database')

exports.all = async function() {
    return db.from('tags')
}
