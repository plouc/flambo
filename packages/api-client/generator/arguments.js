const _ = require('lodash')


/**
 * Map given arguments to spec parameters.
 *
 * @param {Object} spec                        - The current method spec
 * @param {string} name                        - The method name
 * @param {string} method                      - The operation HTTP method
 * @param {string} path                        - The operation path
 * @param {Array.<string|Array.<string>>} args - The desired arguments
 * @returns {Array.<Object>} The matching parameters
 */
exports.mapArgs = (spec, name, method, path, args) => {
    const allBridgeParams = _.flatten(args)

    // Prevent dupes
    const byName = _.groupBy(allBridgeParams)
    Object.keys(byName).forEach(arg => {
        if (byName[arg].length > 1) {
            throw new Error(`found duplicated argument '${arg}' for '${method} ${path}' (method: '${name}()')`)
        }
    })

    // Ensure all required params are defined
    const allSpecParams         = spec.parameters.map(({ name }) => name)
    const paramsDiff            = _.difference(allSpecParams, allBridgeParams)
    const missingRequiredParams = spec.parameters
        .filter(({ name, required }) => paramsDiff.includes(name) && required)
        .map(({ name }) => name)
    if (missingRequiredParams.length > 0) {
        throw new Error([
            `Method '${name}()' signature must define required param(s) [${missingRequiredParams.join(', ')}]`,
            `(operation: '${method} ${path}')`,
        ].join(' '))
    }

    const findArg = arg => {
        const argSpec = spec.parameters.find(({ name }) => name === arg)
        if (!argSpec) {
            throw new Error([
                `parameter '${arg}' does not match any parameter for '${method} ${path}' (method: '${name}()')`,
                `must be one of [${allSpecParams.join(', ')}]`,
            ].join(' '))
        }

        return argSpec
    }

    const resolvedParams = args.reduce((agg, arg) => {
        if (Array.isArray(arg)) return [ ...agg, arg.map(findArg) ]
        return [ ...agg, findArg(arg) ]
    }, [])

    return resolvedParams
}


exports.funcArgsAST = (args) => {
    const ast = []

    args.forEach(arg => {
        // Plain arg
        if (!Array.isArray(arg)) {
            return ast.push({
                type: 'Identifier',
                name: arg.name,
            })
        }

        // Handle composite argument (Object)
        const object = {
            type:       'ObjectPattern',
            properties: [],
        }

        arg.forEach(argPart => {
            const hasDefault = argPart.default !== undefined

            let value
            if (hasDefault) {
                value = {
                    type: 'AssignmentPattern',
                    left: {
                        type: 'Identifier',
                        name: argPart.name,
                    },
                    right: {
                        type:  'StringLiteral',
                        value: argPart.default,
                    },
                }
            } else {
                value = {
                    type: 'Identifier',
                    name: argPart.name,
                }
            }

            object.properties.push({
                type: 'ObjectProperty',
                kind: 'init',
                shorthand: true,
                key: {
                    type: 'Identifier',
                    name: argPart.name,
                },
                value,
            })
        })

        const isRequired = arg.some(argPart => argPart.required && argPart.default === undefined)

        // { a, b }
        if (isRequired) {
            return ast.push(object)
        }

        // { a, b } = {}
        ast.push({
            type: 'AssignmentPattern',
            left: object,
            right: {
                type: 'ObjectExpression',
                properties: [],
            },
        })
    })

    ast.push({
        type: 'Identifier',
        name: 'clientOptions',
    })

    return ast
}