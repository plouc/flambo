const _ = require('lodash')


// values followed by a ((type)) will be coerced to this type
// ex: Then table subscription should have field offerId with value 2201((number)) where id is 2200
// ex: And  table transaction_wha should match the following table where subscriptionId is 2200
//         | status         | INACTIVE |
//         | subscriptionId | 2200((number)) |
//         | offersId       | 2200, 2001((array)) |
exports.coerceToType = value => {
    const matchResult = value.match(/^(.*)\(\((\w+)\)\)$/)
    let response = value

    if (matchResult) {
        switch (matchResult[2]) {
            case 'number':
                response = Number(matchResult[1])
                break
            case 'boolean':
                response = matchResult[1] === 'true'
                break
            case 'object':
                if (matchResult[1] === 'NULL' || matchResult[1] === 'null') {
                    response = null
                }
                if (matchResult[1] === 'undefined' || matchResult[1] === 'UNDEFINED') {
                    response = undefined
                }
                break
            case 'array':
                response = matchResult[1] ? matchResult[1].replace(/\s/g, '').split(',') : []
                break
            case 'date':
                if (matchResult[1] === 'today') {
                    response = new Date().toJSON().slice(0, 10)
                } else {
                    response = new Date(matchResult[1]).toJSON()
                }
                break
            case 'string':
            default:
                break
        }
    }
    return response
}

exports.coerceTypeForObjectsArray = array => {
    return array.map(object => {
        return exports.coerceTypeForObject(object)
    })
}

exports.coerceTypeForArray = array => {
    return array.map(value => {
        return exports.coerceToType(value)
    })
}

exports.coerceTypeForObject = object => {
    const transformedObject = {}
    Object.keys(object).forEach(key => {
        _.set(transformedObject, key, exports.coerceToType(object[key]))
    })

    return transformedObject
}

exports.getItemFromPath = (object, path) => {
    return path === '.' ? object : _.get(object, path)
}

/**
 * This method count the number of properties of an object (it count the number of properties of the nested object too).
 * Ex : user = {
 *          name: 'Paul'
 * 			job: {
 *				title: 'inge',
 *				company: 'Ekino'
 *			}
 *		}
 *	It will return 3 properties for this object
 * @param {Object} object - The object we want to count properties
 * @returns {number} The number of properties
 */
exports.countNestedProperties = object => {
    let propertiesCount = 0
    Object.keys(object).forEach(key => {
        if (!_.isEmpty(object[key]) && typeof object[key] === 'object') {
            const count = exports.countNestedProperties(object[key])
            propertiesCount += count
        } else {
            propertiesCount++
        }
    })
    return propertiesCount
}
