const generator = require('../generator')
const spec      = require('../swagger.json')
const bridge    = require('../bridge.json')


const ctx = { spec }

const modules = Object.keys(bridge)

Promise.all(modules.map(module => {
    return generator.generateModule(ctx, module, bridge[module])
}))
    .then(() => generator.generateEntrypoint(modules))
    .catch(console.error.bind(console))

