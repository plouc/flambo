const _ = require('lodash')

const propertiesTemplate = (name, properties) => ({
    type: 'ObjectProperty',
    kind: 'init',
    key: {
        type: 'Identifier',
        name,
    },
    value: {
        type: 'ObjectExpression',
        properties: properties.map(({ name: key }) => ({
            type: 'ObjectProperty',
            kind: 'init',
            shorthand: true,
            key: {
                type: 'Identifier',
                name: key,
            },
            value: {
                type: 'Identifier',
                name: key,
            },
        })),
    },
})

const appendPathProperties = (args, properties) => {
    const pathArgs = args.filter(arg => arg.in === 'path')
    if (pathArgs.length === 0) return

    properties.push(propertiesTemplate('params', pathArgs))
}

const appendQueryProperties = (args, properties) => {
    const queryArgs = args.filter(arg => arg.in === 'query')
    if (queryArgs.length === 0) return

    properties.push(propertiesTemplate('query', queryArgs))
}

const appendBody = (path, method, args, properties) => {
    const bodyProperties = args.filter(arg => arg.in === 'body')

    if (bodyProperties.length === 0) return

    if (bodyProperties.length > 1) {
        throw Error([
            `Only one body parameter is allowed, found ${bodyProperties.length}`,
            `[${bodyProperties.map(({ name }) => name).join(', ')}]`,
            `for ${method} ${path}`,
        ].join(' '))
    }

    const bodyArg = bodyProperties[0]

    properties.push({
        type: 'ObjectProperty',
        kind: 'init',
        key: {
            type: 'Identifier',
            name: 'body',
        },
        value: {
            type: 'CallExpression',
            callee: {
                type: 'MemberExpression',
                object: {
                    type: 'Identifier',
                    name: 'JSON',
                },
                property: {
                    type: 'Identifier',
                    name: 'stringify',
                },
            },
            arguments: [{
                type: 'Identifier',
                name: bodyArg.name,
            }],
        },
    })
}

/**
 * Generates AST for `builder.build()` call.
 *
 * @param {string}               path   - The path
 * @param {string}               method - The HTTP method
 * @param {Array.<Object|Array>} args   - The resolved method arguments
 * @return {Object} The AST for the builder definition
 */
module.exports = (path, method, args) => {
    const flatArgs        = _.flatten(args)
    const extraProperties = []
    appendPathProperties(flatArgs, extraProperties)
    appendQueryProperties(flatArgs, extraProperties)
    appendBody(path, method, flatArgs, extraProperties)

    return {
        type: 'CallExpression',
        callee: {
            type: 'MemberExpression',
            object: {
                type: 'Identifier',
                name: 'builder',
            },
            property: {
                type: 'Identifier',
                name: 'build',
            },
        },
        arguments: [
            {
                type: 'Identifier',
                name: 'clientOptions',
            },
            {
                type: 'ObjectExpression',
                properties: [
                    {
                        type: 'ObjectProperty',
                        kind: 'init',
                        key: {
                            type: 'Identifier',
                            name: 'path',
                        },
                        value: {
                            type: 'StringLiteral',
                            value: path,
                        },
                    },
                    {
                        type: 'ObjectProperty',
                        kind: 'init',
                        key: {
                            type: 'Identifier',
                            name: 'method',
                        },
                        value: {
                            type: 'StringLiteral',
                            value: method,
                        },
                    },
                    ...extraProperties,
                ],
            },
        ],
    }
}