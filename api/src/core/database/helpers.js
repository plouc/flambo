const _ = require('lodash')

const prefixColumns = (table, columns) => columns.map(column => {
    return `${table}.${column} AS ${table}__${column}`
})

const extractUsingPrefix = (data, _prefix) => {
    const prefix = `${_prefix}__`

    return _.mapKeys(
        _.pickBy(data, (v, k)  => k.startsWith(prefix)),
        (v, k) => k.slice(prefix.length)
    )
}

exports.nestFrom = (parentTable, parentColumns, _groupBy) => {
    const groupBy = _groupBy || parentColumns[0]

    let select = prefixColumns(parentTable, parentColumns)

    const relations         = []
    const relationsDefaults = {}

    const boundNest = {
        item: (table, fields, options = {}) => {
            select = select.concat(prefixColumns(table, fields))

            const checkColumn = options.checkValueOf || fields[0]
            const key         = options.rename       || table

            if (options.hasOwnProperty('default')) {
                relationsDefaults[table] = options.default
            }

            relations.push({
                predicate: row => row[`${table}__${checkColumn}`] !== null,
                append:    (current, row) => {
                    current[key] = extractUsingPrefix(row, table)
                }
            })

            return boundNest
        },
        items: (table, fields, options = {}) => {
            select = select.concat(prefixColumns(table, fields))

            relationsDefaults[table] = []

            const checkColumn = options.checkValueOf || fields[0]
            const key         = options.rename       || table

            relations.push({
                predicate: row => row[`${table}__${checkColumn}`] !== null,
                append:    (current, row) => {
                    current[key] = [ ...current[table], extractUsingPrefix(row, table) ]
                }
            })

            return boundNest
        },
        nest: query => query(select).then(rows => {
            return rows.reduce((parents, row) => {
                const current = _.last(parents)

                if (!current || row[`${parentTable}__${groupBy}`] !== current[groupBy]) {
                    parents.push(Object.assign(
                        extractUsingPrefix(row, parentTable),
                        relationsDefaults
                    ))
                }

                relations
                    .filter(({ predicate }) => predicate(row))
                    .forEach(({ append }) => append(current, row))

                return parents
            }, [])
        })
    }

    return boundNest
}
