const _ = require('lodash')

const {
    PAGINATION_TYPE_PAGE,
    PAGINATION_TYPE_EXPLICIT,
    PAGINATION_TYPE_CURSOR,
    ensureValidType,
} = require('./index')


const pageDto = () => ({ per_page, page }, _items) => {
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

const explicitDto = () => ({ offset, limit }, _items) => {
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
const cursorDto = ({ cursor }) => ({ first }, _items) => {
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
            cursor: Buffer.from(item[cursor]).toString('base64'),
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

const dtoByType = {
    [PAGINATION_TYPE_PAGE]:     pageDto,
    [PAGINATION_TYPE_EXPLICIT]: explicitDto,
    [PAGINATION_TYPE_CURSOR]:   cursorDto,
}

module.exports = (type, ...args) => {
    ensureValidType(type)

    return dtoByType[type](...args)
}
