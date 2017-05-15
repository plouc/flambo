const request               = require('request-promise-native')
const { defineSupportCode } = require('cucumber')


request.defaults({ json: true })

defineSupportCode(function ({ Given }) {
    Given(/^I sign in with user (.*):(.*)$/, function (login, password) {
        return request({
            baseUrl: this.context.apiBaseUrl,
            uri:     '/api/v1/login',
            method:  'POST',
            json:    { login, password },
        })
            .then(({ token }) => {
                this.apiTester.setHeader('Authorization', `Bearer ${token}`)
            })
    })
})
