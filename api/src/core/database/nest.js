const _       = require('lodash')
const helpers = require('./helpers')


const { prefix, extractWithPrefix: extract } = helpers

const relationSingle = (table, column, defaultValue) => {
    const children = []

    return {
        add: child => { children.push(child) },
        extract(node, row) {
            if (row[`${table}__${column}`] !== null) {
                let childNode = node[table]
                if (!childNode) {
                    childNode = extract(row, table)
                    node[table] = childNode
                }

                children.forEach(rel => rel.extract(childNode, row))
            } else {
                node[table] = defaultValue
            }
        },
    }
}

const relationMany = (table, column) => {
    const children = []

    return {
        add: child => { children.push(child) },
        extract(node, row) {
            if (row[`${table}__${column}`] !== null) {
                if (!_.has(node, table)) node[table] = []

                let childNode = _.find(node[table], {
                    [column]: row[`${table}__${column}`],
                })
                if (!childNode) {
                    childNode = extract(row, table)
                    node[table].push(childNode)
                }

                children.forEach(rel => rel.extract(childNode, row))
            } else {
                node[table] = []
            }
        }
    }
}

class Nest {
    constructor(table, columns, {
        extra = [],
    } = {}) {
        this.parentTable   = table
        this.parentColumns = columns
        this.extra         = extra
        this.groupBy       = columns[0]

        this.select = prefix(
            this.parentTable,
            this.parentColumns
        )

        this.relations       = []
        this.relationsByPath = {}
    }

    register(table, relation, parent) {
        let path = table
        if (parent !== undefined) {
            const parentRelation = this.relationsByPath[parent]
            if (!this.relationsByPath[parent]) {
                throw new Error(`Unable to create nesting, no relation found for path: "${parent}"`)
            }

            parentRelation.add(relation)

            path = `${parent}.${table}`
        } else {
            this.relations.push(relation)
        }

        this.relationsByPath[path] = relation
    }

    one(table, fields, options = {}) {
        this.select = this.select.concat(prefix(table, fields))

        const relation = relationSingle(table, fields[0], options.default || null)
        this.register(table, relation, options.parent)

        return this
    }

    many(table, fields, options = {}) {
        this.select = this.select.concat(prefix(table, fields))

        const relation = relationMany(table, fields[0])
        this.register(table, relation, options.parent)

        return this
    }

    selection() {
        return this.select
    }

    rollup(rows) {
        if (rows.length === 0) return []

        return rows.reduce((rootNodes, row) => {
            let rootNode = _.find(rootNodes, {
                [this.groupBy]: row[`${this.parentTable}__${this.groupBy}`],
            })
            if (!rootNode) {
                rootNode = extract(row, this.parentTable)
                this.extra.forEach(key => {
                    rootNode[key] = row[key]
                })
                rootNodes.push(rootNode)
            }

            this.relations.forEach(rel => rel.extract(rootNode, row))

            return rootNodes
        }, [])
    }
}

/**
 * @returns {Nest}
 */
module.exports = (...args) => new Nest(...args)
