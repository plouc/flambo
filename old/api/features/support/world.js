const api = require('./../../api-tester');

module.exports = function () {
    api.install(this)
    this.api.setBaseUrl(process.env.API_BASE_URL || 'http://localhost:3000')
}
