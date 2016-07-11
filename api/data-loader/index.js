const _    = require('lodash')
const util = require('util')

const extractRefs = (node, path = []) => {
    const refs = []

    if (_.isString(node)) {
        const parts = node.match(/\$([^:]+):([^.]+).(.*)/)
        if (parts !== null) {
            return refs.concat({
                from: {
                    property: path.join('.'),
                },
                to: {
                    group:    parts[1],
                    id:       parts[2],
                    property: parts[3],
                },
            })
        }
    } else if (_.isArray(node)) {
        return refs.concat(_.flatten(node.map((n, i) => extractRefs(n, path.concat(i)))))
    } else if (_.isPlainObject(node)) {
        return refs.concat(_.flatten(Object.keys(node).map(k => extractRefs(node[k], path.concat(k)))))
    }

    return refs
}

const chainedFrom = (node, groups) => {
    console.log('chainedFrom', util.inspect(node, { depth: null }))

    node.__refs.links.forEach(link => {
        const { from } = link
        console.log('<- from', from.group, from.id)

        chainedFrom(groups[from.group][from.id], groups)
    })
}

const checkDeps = (node, groups) => {
    console.log('checkDeps', util.inspect(node, { depth: null }))
    node.__refs.links.forEach(link => {
        const { to } = link
        console.log('to ->', to.group, to.id)

        chainedFrom(groups[to.group][to.id], groups)
    })
    /*
    node.__refs.links.forEach(({ to }) => {
        if (deps.includes(`${to.group}.${to.id}`)) {
            throw new Error(`Found circular dependency: ${deps.concat(`${to.group}.${to.id}`).join(' -> ')}`)
        } else {
            deps.push(`${to.group}.${to.id}`)
            recDeps(groups[to.group][to.id], groups, deps)
        }
    })
    */
}

module.exports.data = (...dataSets) => {
    const groups = {}

    // Group data by entity type
    dataSets.forEach((dataSet, i) => {
        Object.keys(dataSet).forEach(group => {
            if (!groups[group]) {
                groups[group] = {}
            }

            const groupData         = dataSet[group]
            const existingGroupData = groups[group]

            _.forOwn(groupData, (datum, ref) => {
                if (_.has(existingGroupData, ref)) {
                    throw new Error(`ref "${ref}" already exist in "${group}" group (found in data set ${i})`)
                }

                existingGroupData[ref] = datum
            })
        })
    })

    let links = []

    // traverse the tree to find dependencies
    _.forOwn(groups, (groupData, group) => {
        _.forOwn(groupData, (datum, id) => {
            const selfRef = `${group}.${id}`
            const refs    = extractRefs(datum).map(r => {
                r.from.group = group
                r.from.id    = id

                return r
            })

            refs.forEach(r => {
                if (r.to.group === group && r.to.id === id) {
                    throw new Error(`An entity cannot reference itself: "${selfRef}" (found at: ${r.from.property})`)
                }
                if (!_.has(groups, `${r.to.group}.${r.to.id}`)) {
                    throw new Error(`Reference not found: "${r.to.group}.${r.to.id}" (found at: ${selfRef}.${r.from.property})`)
                }
            })

            datum.__refs = {
                links: refs,
            }

            links = links.concat(refs)
        })
    })

    // no circular refs
    _.forOwn(groups, (groupData, group) => {
        _.forOwn(groupData, (datum, id) => {
            console.log('————————————————————————————————————————————————————————————————————————————————————')
            console.log('===>', group, id)
            console.log('————————————————————————————————————————————————————————————————————————————————————')
            checkDeps(datum, groups)
        })
    })

    console.log('————————————————————————————————————————————————————————————————————————————————————')
    console.log(util.inspect(groups, { depth: null, colors: true }))
    console.log('————————————————————————————————————————————————————————————————————————————————————')
    console.log(util.inspect(links, { depth: null, colors: true }))
}
