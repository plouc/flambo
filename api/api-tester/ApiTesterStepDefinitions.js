const { expect } = require('chai')

module.exports = runner => {
    // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————
    // GIVEN
    // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————

    runner.Given(/^I set query parameter (.*) to (.*)$/, runner.api.setQueryParameter)

    runner.Given(/^I set header (.*) to (.*)$/, runner.api.setHeader)

    runner.Given(/^I set request json to$/, step => {
        const jsonObject = step.rowsHash()
        runner.api.setJson(jsonObject)
    })

    // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————
    // WHEN
    // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————

    runner.When(/^I GET (.*)$/, (path, callback) => {
        runner.api.get(path)
            .then(() => {
                callback()
            })
            .catch(() => {
                callback()
            })
    })

    runner.When(/^I POST (.*)$/, (path, callback) => {
        runner.api.post(path)
            .then(() => {
                callback()
            })
            .catch(() => {
                callback()
            })
    })

    // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————
    // THEN
    // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————

    runner.Then(/^http status code should be ([1-5][0-9][0-9])$/, expectedStatusCode => {
        const statusCode = runner.api.getStatusCode()
        expect(
            statusCode,
            `expecting http status code to be ${expectedStatusCode}, found ${statusCode} instead`
        ).to.equal(parseInt(expectedStatusCode, 10))
    })

    runner.Then(/^([^ ]*) header should exist$/, header => {
        const headerValue = runner.api.getHeader(header)

        expect(
            headerValue,
            `${header} http header does not exist`
        ).to.exist
    })

    runner.Then(
        /^([^ ]*) header should be (equal to|greater than|lower than){1} (.*)$/,
        (header, operator, expectedValue) => {
            const currentValue = runner.api.getHeader(header)

            expect(currentValue, `${header} http header does not exist`).to.exist

            switch (operator) {
                case 'equal to':
                    expect(
                        currentValue,
                        `${header} http header value is not equal to ${expectedValue} (current: ${currentValue})`
                    ).to.equal(currentValue)
                    break

                case 'greater than':
                    expect(
                        parseFloat(currentValue),
                        `${header} http header value is not greater than ${expectedValue} (current: ${currentValue})`
                    ).to.be.above(parseFloat(expectedValue))
                    break

                case 'lower than':
                    expect(
                        parseFloat(currentValue),
                        `${header} http header value is not lower than ${expectedValue} (current: ${currentValue})`
                    ).to.be.below(parseFloat(expectedValue))
                    break
            }
        }
    )
}