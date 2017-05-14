const _              = require('lodash')
const yaml           = require('js-yaml')
const fs             = require('fs')

let config           = {}

const confDir        = `${__dirname}/../../conf`
const basePath       = `${confDir}/base.yaml`
const envMappingPath = `${confDir}/env_mapping.yaml`
const overridesPath  = process.env.NODE_ENV ? `${confDir}/${process.env.NODE_ENV}.yaml` : null

/**
 * Get a value from the configuration. Supports dot notation (eg: "key.subkey.subsubkey")...
 *
 * @param {string} key - Key. Support dot notation.
 * @returns {*} value
 */
exports.get = key => _.get(config, key)

/**
 * Set a value in the configuration. Supports dot notation (eg: "key.subkey.subsubkey")
 * and array notation (eg: "key.subkey[0].subsubkey").
 *
 * @param {string} key   - Key. Support dot notation.
 * @param {object} value - value. If null or undefined, key is removed.
 * @returns {void}
 */
exports.set = (key, value) => {
    if (_.isUndefined(value) || _.isNull(value)) {
        _.unset(config, key)
    } else {
        _.set(config, key, value)
    }
}

/**
 * Dumps the whole config object.
 *
 * @returns {object} The whole config object
 */
exports.dump = () => config

/**
 * Read a yaml file and convert it to json.
 * WARNING : This use a sync function to read file
 * @param {string} path
 * @return {Object}
 */
const readYaml = path => {
    const content = fs.readFileSync(path, { encoding: 'utf8' })
    const result  = yaml.safeLoad(content)

    return result
}

/**
 * Read env variables override file and set config from env vars
 * @return {Object}
 */
const readEnvOverrides = () => {
    const result = {}

    try {
        const content = readYaml(envMappingPath)
        _.forOwn(content, (value, key) => {
            _.set(result, value, process.env[key])
        })
    } catch (e) {
        console.warn(`No environment vars mapping`)
    }

    return result
}

/**
 * Return the source value if it is an array
 * This function is used to customize the default output of _.mergeWith
 *
 * @param {*} objValue: the target field content
 * @param {*} srcValue: the new value
 * @returns {*}: return what we want as a value, or undefined to let the default behaviour kick in
 */
const customizer = (objValue, srcValue) => {
    return _.isArray(srcValue) ? srcValue : undefined
}

/**
 * Read base file, override it with env file and finally override it with env vars
 */
const load = () => {
    const base = readYaml(basePath)

    let env = {}
    if (overridesPath) {
        try {
            env = readYaml(overridesPath)
        } catch (e) {
            console.warn(`No specific environment config`)
        }
    }

    const envOverrides = readEnvOverrides()

    config = _.mergeWith({}, base, env, envOverrides, customizer)
}

load()
