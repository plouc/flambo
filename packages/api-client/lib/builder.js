const memoize  = require('lodash/memoize')
const template = require('lodash/template')
const defaults = require('lodash/defaults')
const qs       = require('qs')


const clientDefaults = {
    apiUrl:  'http://localhost:7000/api/v1',
    headers: {},
}

const pathTemplate         = path => template(path, { interpolate: /{([\s\S]+?)}/g })
const memoizedPathTemplate = memoize(pathTemplate)

exports.build = (
    clientOptions = {},
    {
        path,
        params  = {},
        method  = 'GET',
        headers = {},
        query,
        body,
    }
) => {
    const options = defaults(clientOptions, clientDefaults)
    if (!options.token) {
        throw new Error(`You must provide a valid token`)
    }

    const pathTemplate = memoizedPathTemplate(path)

    let url = `${options.apiUrl}${pathTemplate(params)}`
    if (query !== undefined && Object.keys(query).length > 0) {
        url = `${url}?${qs.stringify(query)}`
    }

    const requestOptions = {
        method,
        headers: Object.assign(
            {
                'Authorization': `Bearer ${options.token}`,
                'Content-Type': 'application/json',
            },
            options.headers,
            headers
        ),
        body,
    }

    return { url, options: requestOptions }
}