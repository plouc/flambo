const api                    = require('./ApiTester')
const installStepDefinitions = require('./ApiTesterStepDefinitions')

exports.install = runner => {
    runner.api = api
    installStepDefinitions(runner)
    runner.registerHandler('BeforeScenario', () => {
        runner.api.reset()
    })
}