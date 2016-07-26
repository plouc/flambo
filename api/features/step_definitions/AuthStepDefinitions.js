'use strict'

const request = require('request').defaults({ json: true })


module.exports = function () {
    this.Given(/^I am authenticated as ([^ ]+) ([^ ]+)$/, (email, password, callback) => {
        const options = {
            baseUrl: this.api.getBaseUrl(),
            uri:     '/api/v1/users/token',
            method:  'POST',
            body:    { email, password },
        };

        request(options, (err, res) => {
            if (err) {
                callback(err)
            } else {
                if (res.statusCode !== 200) {
                    callback(new Error('Unable to authenticate'))
                } else {
                    this.api.setHeader('Authorization', `JWT ${res.body.token}`)
                    callback()
                }
            }
        })
    })

    this.Given(/^I am not authenticated$/, () => {
        this.api.removeHeader('Authorization')
    })
}