const arguments         = require('../arguments')
const defineFetch       = require('./module_method_fetch.js')
const defineBuilderCall = require('./module_method_builder')
const generateDoc       = require('./module_method_doc')


module.exports = ({ spec }, name, { method = 'get', path, args = [] }) => {
    // Ensure operation exists in the spec
    if (!spec.paths[path]) {
        throw new Error(`Unable to find path ${path} for method ${name}`)
    }
    if (!spec.paths[path][method]) {
        throw new Error([
            `Unable to find HTTP method ${method} for path ${path} (method ${name}),`,
            `must be one of: [${Object.keys(spec.paths[path]).join(', ')}]`,
        ].join(' '))
    }

    const methodSpec   = spec.paths[path][method]
    const resolvedArgs = arguments.mapArgs(methodSpec, name, method, path, args)
    const params       = arguments.funcArgsAST(resolvedArgs)
    const jsDoc        = generateDoc(methodSpec, resolvedArgs)

    return {
        type: 'ObjectProperty',
        leadingComments: [
            {
                type:  'CommentBlock',
                value: jsDoc,
            },
        ],
        key: {
            type: 'Identifier',
            name,
        },
        value: {
            type: 'ArrowFunctionExpression',
            params,
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'VariableDeclaration',
                        kind: 'const',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                id: {
                                    type: 'Identifier',
                                    name: 'req',
                                },
                                init: defineBuilderCall(path, method, resolvedArgs),
                            },
                        ],
                    },
                    defineFetch,
                ],
            },
        },
    }
}