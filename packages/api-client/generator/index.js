const fs        = require('fs')
const generate  = require('babel-generator').default
const prettier  = require('prettier')
const fragments = require('./fragments')


const format = true

const commonGeneratorOptions = {
    comments: true,
    quotes:   'single',
}

exports.generateModule = (ctx, name, methodSpecs) => {
    const methods = []
    Object.keys(methodSpecs).forEach(methodName => {
        methods.push(fragments.moduleMethod(ctx, methodName, methodSpecs[methodName]))
    })

    const tree = {
        type: 'File',
        program: {
            type:       'Program',
            sourceType: 'module',
            body: [
                fragments.importBuilder,
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'Identifier',
                                name: 'module',
                            },
                            property: {
                                type: 'Identifier',
                                name: 'exports',
                            }
                        },
                        right: {
                            type: 'ObjectExpression',
                            parenthesizedExpression: true,
                            properties: methods,
                        },
                    },
                },
            ],
        },
    }

    const now                    = new Date()
    const auxiliaryCommentBefore = `* @module ${name} */
    
/*    
 * This code were auto-generated
 * DO NOT EDIT!
 * 
 * generated on: ${now}
 `

    const generated = generate(tree, {
        comments: true,
        quotes:   'single',
        auxiliaryCommentBefore,
    })

    let { code } = generated
    if (format) {
        code = prettier.format(code, {
            printWidth:     80,
            tabWidth:       4,
            semi:           false,
            trailingComma:  'es5',
            bracketSpacing: true,
            singleQuote:    true,
            parser:         'babylon',
        })
    }

    return new Promise((resolve, reject) => {
        fs.writeFile(`lib/${name}.js`, code, err => {
            if (err) return reject(err)
            resolve(code)
        })
    })
}


exports.generateEntrypoint = modules => {
    const tree = {
        type: 'File',
        program: {
            type:       'Program',
            sourceType: 'module',
            body:       modules.map(fragments.moduleExport),
        },
    }

    const now                    = new Date()
    const auxiliaryCommentBefore = `    
 * This code were auto-generated
 * DO NOT EDIT!
 * 
 * generated on: ${now}
 `

    const generated = generate(tree, {
        comments: true,
        quotes:   'single',
        auxiliaryCommentBefore,
    })

    let { code } = generated
    if (format) {
        code = prettier.format(code, {
            printWidth:     80,
            tabWidth:       4,
            semi:           false,
            trailingComma:  'es5',
            bracketSpacing: true,
            singleQuote:    true,
            parser:         'babylon',
        })
    }

    return new Promise((resolve, reject) => {
        fs.writeFile(`lib/modules.js`, code, err => {
            if (err) return reject(err)
            resolve(code)
        })
    })
}