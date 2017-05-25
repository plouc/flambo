const path      = require('path')
const _         = require('lodash')
const helper    = require('jsdoc/util/templateHelper')
const xFs       = require('jsdoc/fs')
const fs        = require('fs-extra')
const templates = require('./lib/templates')
const signature = require('./lib/signature')


const util = require('util')
const inspect = _.partialRight(util.inspect, { colors: true, depth: null })

const githubRoot = 'https://github.com/plouc/flambo/blob/master/packages/api-client/lib'

exports.publish = (data, opts) => {
    const outputDir = path.normalize(opts.destination)

    const members = helper.getMembers(data)

    const modules = members.modules.map(module => ({
        name:      module.name,
        path:      _.kebabCase(module.longname),
        file:      _.snakeCase(module.longname),
        component: _.upperFirst(_.camelCase(module.longname)),
        methods:   [],
    }))

    data().each(doclet => {
        if (signature.needsSignature(doclet)) {
            signature.addSignatureParams(doclet)
        }

        if (doclet.kind === 'function') {
            if (doclet.memberof && doclet.memberof.startsWith('module:')) {
                const moduleName = doclet.memberof.substr('module:'.length)
                const module = modules.find(({ name }) => name === moduleName)

                console.log(inspect(doclet))

                module.methods.push(Object.assign({}, doclet, {
                    source: {
                        file: `${githubRoot}/${doclet.meta.filename}`,
                    },
                }))
            }
        }
    })

    //console.log(modules[0])

    fs.emptyDir(outputDir)
        .then(() => {
            xFs.mkPath(outputDir)

            templates()
                .then(t => {
                    return Promise.all([
                        fs.outputFile(
                            path.join(outputDir, 'navigation.js'),
                            t.navigation({ items: modules })
                        ),
                        fs.outputFile(
                            path.join(outputDir, 'root.js'),
                            t.root({ items: modules })
                        ),
                    ])
                    .then(() => {
                        return Promise.all(modules.map(module => {
                            return fs.outputFile(
                                path.join(outputDir, `${module.file}.js`),
                                t.module({ module })
                            )
                        }))
                    })
                })
        })
        .catch(console.error.bind(console))
}
