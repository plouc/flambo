const config   = require('../../core/config')
const elastic  = require('../../core/elastic')


const buildQuery = _query => {
    let query = { match_all: {} }

    const queryKeys = Object.keys(_query)

    if (queryKeys.length === 0) return query

    const boolQueries = []
    queryKeys.forEach(queryKey => {
        const queryValue = _query[queryKey]
        if (Array.isArray(queryValue)) {
            boolQueries.push({ terms: { [queryKey]: queryValue } })
        } else {
            boolQueries.push({ term: { [queryKey]: queryValue } })
        }
    })

    query = {
        constant_score: {
            filter: {bool: {must: boolQueries}},
        },
    }

    return query
}

exports.search = ({ limit, offset, query: _query = {} } = {}) => {
    const query = buildQuery(_query)

    return elastic.search({
        index: config.get('elastic.index'),
        size:  limit,
        from:  offset,
        body:  { query },
    })
        .then(result => {
            const { total, hits } = result.hits

            const docs = hits.map(({ _id, _source }) => {
                //_source.id = _id

                return _source
            })

            return {
                total,
                docs,
            }
        })
}