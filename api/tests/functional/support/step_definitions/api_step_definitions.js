const { defineSupportCode } = require('cucumber')
const chai                  = require('chai')
const expect                = chai.expect
const joi                   = require('joi')
const _                     = require('lodash')

const helpers               = require('./helpers')


defineSupportCode(function ({ Given, When, Then }) {
    When(/^I (GET|POST|PUT|DELETE) (.*)$/, function (method, path) {
        return this.apiTester.makeRequest(method, path, this.context.apiBaseUrl)
    })

    Then(/^I should receive a ([1-5][0-9][0-9]) HTTP status code$/, function (statusCode) {
        const httpResponse = this.apiTester.getResponse()
        expect(httpResponse).to.not.be.empty
        expect(httpResponse.statusCode).to.equal(Number(statusCode))
    })
})

/*
module.exports = function() {
    // —————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    // GIVEN
    // —————————————————————————————————————————————————————————————————————————————————————————————————————————————————

    this.Given(/^I set request body to$/, step => {
        this.apiTester.setBody(step.rowsHash())
    })

    this.Given(/^I set request query to$/, step => {
        this.apiTester.setQuery(step.rowsHash())
    })

    // —————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    // WHEN
    // —————————————————————————————————————————————————————————————————————————————————————————————————————————————————

    this.When(/^I reset http parameters$/, () => {
        this.apiTester.reset()
    })

    this.When(/^I (GET|POST|PUT|DELETE) (.*)$/, (method, path, callback) => {
        this.apiTester.makeRequest(method, path, API_BASE_URL).then(() => {
            callback()
        })
    })

    // —————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    // THEN
    // —————————————————————————————————————————————————————————————————————————————————————————————————————————————————

    this.Then(/^I should receive a ([1-5][0-9][0-9]) HTTP status code$/, statusCode => {
        const httpResponse = this.apiTester.getResponse()
        expect(httpResponse).to.not.be.empty
        expect(httpResponse.statusCode).to.equal(Number(statusCode))
    })

    // ERRORS

    this.Then(/^I should receive a json validation_error with message (.*) and additional error infos :$/, (message, table) => {
        const response = this.apiTester.getResponse()

        expect(response.headers['content-type']).to.contain('application/json')

        const body = response.body

        expect(body).to.not.be.null
        //expect(body).to.have.property('type', API_ERRORS.VALIDATION_ERROR)
        expect(body).to.have.property('message', message)
        expect(_.sortBy(body.errors, 'message')).to.be.deep.equal(_.sortBy(table.hashes(), 'message'))
    })

    this.Then(/^I should receive a json (internal_error|resource_not_found) with message (.*)$/, (errorType, message) => {
        const response = this.apiTester.getResponse()

        expect(response.headers['content-type']).to.contain('application/json')

        const body = response.body

        expect(body).to.not.be.null
        expect(body).to.have.property('type', errorType)
        expect(body).to.have.property('message', message)
    })

    // SUCCESS

    /**
     * This definition can be used for checking an object response.
     * It check that the properties of this object match with the expected properties
     * The columns header are | field | matcher | value |
     * You can define severals matchers :
     * - equals
     * - contains
     *
    this.Then(/^I should receive a json response (fully )?matching/, (fully, table) => {
        const response = this.apiTester.getResponse()
        const body = response.body
        const expectedProperties = helpers.coerceTypeForObjectsArray(table.hashes())

        // We check the response has json content-type
        expect(response.headers['content-type']).to.contain('application/json')

        // We check response properties correspond to the expected response
        expectedProperties.forEach(propertyMatcher => {
            switch (propertyMatcher.matcher) {
                case 'contains':
                    expect(_.get(body, propertyMatcher.field)).to.contain(propertyMatcher.value)
                    break
                case 'equals':
                default:
                    expect(_.get(body, propertyMatcher.field)).to.be.deep.equal(propertyMatcher.value)
            }
        })

        // We check we have exactly the same number of properties as expected
        if (fully) {
            const propertiesCount = helpers.countNestedProperties(body)
            expect(propertiesCount).to.be.equal(table.hashes().length)
        }
    })

    /**
     * This definition verify that an array for a given path has the expected length
     *
    this.Then(/^I should receive a collection of (\d+) items for path '(.*)'/, (itemsNumber, path) => {
        const { body } = this.apiTester.getResponse()
        const array = helpers.getItemFromPath(body, path)

        expect(array.length).to.be.equal(Number(itemsNumber))
    })
}
*/
