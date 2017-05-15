const { defineSupportCode } = require('cucumber')

const apiTester             = require('./helpers/api_tester')


function CustomWorld() {
    this.apiTester = apiTester
    this.context   = {
        apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:7000',
    }
}

defineSupportCode(({ setWorldConstructor }) => {
    setWorldConstructor(CustomWorld)
})
