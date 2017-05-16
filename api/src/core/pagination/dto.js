const _ = require('lodash')


exports.withPage = ({ per_page, page }, _items) => {
    let items = _items

    const output = {
        page,
        per_page,
        previous_page: page > 1 ? page - 1 : null,
        next_page:     null,
    }

    if (items.length > per_page) {
        items = _items.slice(0, per_page)
        output.next_page = page + 1
    }

    output.items = items

    return output
}

exports.withOffsetLimit = ({ offset, limit }, _items) => {
    let items = _items

    const output = {
        offset,
        limit,
        has_next_page: false,
    }

    if (items.length > limit) {
        items = _items.slice(0, limit)
        output.has_next_page = true
    }

    output.items = items

    return output
}

/**
 * Heavily inspired by http://graphql.org/learn/pagination/.
 *
 * @param {string} cursor - The field to use for cursor
 */
exports.withCursor = ({ cursor }) => {
    const computeCursor = item => {
        const cursorObject = {}
        cursor.forEach(key => {
            cursorObject[key] = item[key]
        })

        console.log('computed cursor', cursorObject)

        return Buffer.from(JSON.stringify(cursorObject)).toString('base64')
    }

    return ({ first }, _items) => {
        let items = _items

        const pageInfo = {
            endCursor:   null,
            hasNextPage: false,
        }

        if (items.length > first) {
            items = _items.slice(0, first)
            pageInfo.hasNextPage = true
        }

        const edges = items.map(item => {
            return {
                node:   item,
                cursor: computeCursor(item),
            }
        })

        if (items.length > 0) {
            pageInfo.endCursor = _.last(edges).cursor
        }

        return {
            edges,
            pageInfo,
        }
    }
}
