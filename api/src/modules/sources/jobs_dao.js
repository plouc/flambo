const db    = require('../../core/database')
const nest  = require('../../core/database/nest')


exports.columns = [
    'id',
    'status',
]

exports.find = ({ offset, limit, query = {} } = {}) => {
    const nesting = nest('source_jobs', exports.columns)

    const queryKeys = Object.keys(query)

    return db.from('source_jobs')
        .select(nesting.selection())
        .modify(qb => {
            if (limit  !== undefined) qb.limit(limit)
            if (offset !== undefined) qb.offset(offset)

            const hasSourceFilter = !!queryKeys.find(key => key.startsWith('source'))
            if (hasSourceFilter) {
                qb.innerJoin('sources AS source', 'source.id', 'source_jobs.source_id')
            }

            queryKeys.filter(key => !key.includes('.'))
                .forEach(key => {
                    qb.where(`source_jobs.${key}`, query[key])
                })

            queryKeys.filter(key => key.includes('.'))
                .forEach(key => {
                    qb.where(key, query[key])
                })
        })
        .orderBy('source_jobs.id')
        .then(nesting.rollup.bind(nesting))
}

exports.findOne = ({ query = {} } = {}) => {
    return exports.find({ limit: 1, query })
        .then(([row]) => row)
}
