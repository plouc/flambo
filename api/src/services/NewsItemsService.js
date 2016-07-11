/**
 * @module services/NewsItemsService
 */
'use strict'

const _         = require('lodash')
const container = require('../container')
const util      = require('util')


const defaultParams = {
    sort:       [],
    filters:    {},
    pagination: {
        page:   1,
        offset: 0,
        limit:  10,
    },
}

const allowedFilters = [
    'ids',
    'sourceType',
    'sourceId',
]

module.exports.search = (params = defaultParams) => {

    const mergedParams = Object.assign({}, defaultParams, params)

    console.log('NewsItemsService mergedParams')
    console.log(util.inspect(mergedParams, { depth: null, colors: true }))

    const { page, offset, limit } = mergedParams.pagination

    let { sort } = mergedParams
    if (!sort || _.isEmpty(sort)) {
        sort = [ { createdAt: { order: 'desc' }}]
    }

    let query = {
        match_all: {},
    }

    const filterKeys = Object.keys(mergedParams.filters).filter(k => allowedFilters.includes(k))

    console.log(filterKeys)
    if (filterKeys.length > 0) {
        const boolQueries = []
        filterKeys.forEach(filterKey => {
            const filterValue = mergedParams.filters[filterKey]
            if (filterKey === 'ids') {
                boolQueries.push({ ids: {
                    values: Array.isArray(filterValue) ? filterValue : [filterValue],
                }})
            } else if (Array.isArray(filterValue)) {
                boolQueries.push({ terms: { [filterKey]: filterValue } })
            } else {
                boolQueries.push({ term: { [filterKey]: filterValue } })
            }
        })

        query = {
            constant_score: {
                filter: { bool: { must: boolQueries } },
            },
        }
    }

    console.log(util.inspect(query, { depth: null, colors: true }))

    return container.get('elastic').search({
        index: 'flambo',
        size:  limit,
        from:  offset,
        body:  {
            sort,
            query,
        }
    })
    .then(result => {
        const { total, hits } = result.hits

        const docs = hits.map(({ _id, _source }) => {
            _source.id = _id

            return _source
        })

        return {
            page,
            limit,
            total,
            docs,
        }
    })
    .catch(err => {
        console.error(err)
    })
}
