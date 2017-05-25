const fs       = require('fs')
const path     = require('path')
const _        = require('lodash')
const mustache = require('mustache')

const load = name => new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, `${name}.mu`), (err, data) => {
        if (err) return reject(err)
        resolve(data.toString('utf8'))
    })
})

const templates = [
    'navigation',
    'root',
    'module',
]


module.exports = () => Promise.all(templates.map(template => {
    return load(template)
}))
    .then(parsedTemplates => {
        const registry = {}
        templates.forEach((template, index) => {
            registry[template] = _.partial(mustache.render, parsedTemplates[index])
        })

        return registry
    })
