exports.UNCAUGHT_ERROR    = ''
exports.UNCAUGHT_DB_ERROR = ''
exports.NOT_FOUND         = ''
exports.MALFORMATTED_DATA = ''

Object.keys(module.exports).forEach(errorType => {
    module.exports[errorType] = errorType
})
