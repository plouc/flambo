const resolveRefs  = require('json-refs').resolveRefs
const yaml         = require('js-yaml')
const fs           = require('fs')
const swaggerTools = require('swagger-tools')
const validators   = require('swagger-tools/lib/validators')
const util         = require('util')

const loadEntryPoint = file => new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
        if (err) return reject(err)
        resolve(data.toString('utf8'))
    })
})

const resolveSchemaRefs = location => data => {
    try {
        const swagger = yaml.load(data)

        return resolveRefs(swagger, {
            location,
            filter:        ['relative', 'local'],
            loaderOptions: {
                processContent: ({ text }, callback) => {
                    try {
                        const parsed = yaml.load(text)
                        callback(null, parsed)
                    } catch (err) {
                        callback(err)
                    }
                }
            },
        })
    } catch (err) {
        return Promise.reject(err)
    }
}

const checkRefsErrors = ({ refs, resolved }) => {
    const errors = Object.keys(refs).reduce((agg, refPath) => {
        const refInfo = refs[refPath]

        if (!refInfo.error) return agg

        return [
            ...agg,
            `failed to resolve ref for path '${refPath}' (${JSON.stringify(refInfo.def)}):\n  ${refInfo.error}`,
        ]
    }, [])

    if (errors.length > 0) return Promise.reject(new Error(errors.join('\n')))

    return resolved
}

const validateSchema = schema => new Promise((resolve, reject) => {
    try {
        validators.validateAgainstSchema(
            swaggerTools.specs.v2.schemas['schema.json'],
            schema,
            swaggerTools.specs.v2.validators['schema.json']
        )

        resolve(schema)
    } catch (err) {
        if (err.code === 'SCHEMA_VALIDATION_FAILED') {
            return reject(new Error(`${err.message}:\n  ${util.inspect(err.results.errors, { depth: null })}`))
        }

        reject(err)
    }
})

const writeResolvedSchema = path => schema => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, yaml.safeDump(schema), err => {
            if (err) return reject(err)
            resolve(schema)
        })
    })
}

const generateSwagger = (file, targetPath) => loadEntryPoint(file)
    .then(resolveSchemaRefs(file))
    .then(checkRefsErrors)
    .then(validateSchema)
    .then(writeResolvedSchema(targetPath))

generateSwagger('src/api/v1/spec/swagger_with_refs.yml', 'src/api/v1/spec/swagger.yml')
    .then(schema => {
        //console.log(yaml.safeDump(schema))
    })
    .catch(err => {
        console.error(err)
    })