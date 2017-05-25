const _ = require('lodash')


const paramName = (arg, prefix = '') => {
    const hasDefault = arg.default !== undefined
    const isRequired = arg.required

    const name = `${prefix ? `${prefix}.` : ''}${arg.name}`

    if (!isRequired) {
        if (hasDefault) return `[${name}=${arg.default}]`
        return `[${name}]`
    }

    return name
}

/**
 * @see http://swagger.io/specification/#data-types-12
 */
const typeMapping = {
    number:   'number',
    integer:  'number',
    long:     'number',
    float:    'number',
    double:   'number',
    string:   'string',
    byte:     'string',
    boolean:  'boolean',
    date:     'string',
    dateTime: 'string',
    password: 'string',
    object:   'Object',
}

const mapType = arg => {
    if (!typeMapping[arg.type]) {
        console.warn([
            `Unable to define jsdoc @param type mapping for ${arg.name} (${JSON.stringify(arg, null, '  ')}),`,
            `should be one of [${Object.keys(typeMapping).join(', ')}]`,
        ].join(' '))

        return '*'
    }

    return typeMapping[arg.type]
}

const generateDescription = param => {
    if (!param.description) return ''
    return ` - ${param.description}`
}

const generateParam = (param, prefix = '') => {
    return `   * @param {${mapType(param)}} ${paramName(param, prefix)}${generateDescription(param)}`
}

const generateObjectParams = (param, properties) => {
    const params = [generateParam(param)]
    properties.forEach(prop => {
        params.push(generateParam(prop, param.name))
    })

    return params
}

module.exports = (spec, args) => {
    let doc = `*
   * ${spec.description || spec.summary}
   *`

    let params = []
    args.forEach(arg => {
        if (Array.isArray(arg)) {
            const required = arg.some(argPart => argPart.required && argPart.default === undefined)

            params = [
                ...params,
                ...generateObjectParams({
                    name: 'params',
                    type: 'object',
                    required,
                }, arg)
            ]
        } else if (arg.in === 'body') {
            const properties = _.values(_.mapValues(arg.schema.properties, (def, name) => {
                return Object.assign({}, def, {
                    name,
                    required: arg.schema.required && arg.schema.required.includes(name),
                })
            }))
            params = [...params, ...generateObjectParams(Object.assign({}, arg, { type: 'object' }), properties)]
        } else {
            params = [...params, generateParam(arg)]
        }
    })

    params.push(`   * @param {ClientOptions} [clientOptions] - The global client options`)

    return `${doc}\n${params.join('\n')}\n   `
}
