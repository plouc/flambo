const _ = require('lodash')


module.exports = string => {
    return _.kebabCase(_.deburr(string.trim().toLowerCase()))
}
