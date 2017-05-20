const _         = require('lodash')
const meetup    = require('@flambo/source-meetup')
const rss       = require('@flambo/source-rss')

const dbHelpers = require('../../core/database/helpers')
const config    = require('../../core/config')
const dao       = require('./dao')
const jobsDao   = require('./jobs_dao')


const SOURCE_METHODS = ['register', 'load']

const bindSourceType = sourceType => {
    const methods = {}
    SOURCE_METHODS.forEach(method => {
        if (sourceType[method]) {
            methods[method] = sourceType[method](config)
        }
    })

    return methods
}

exports.types = {
    meetup: bindSourceType(meetup),
    rss:    bindSourceType(rss),
}


exports.all = ({ limit, offset, query }) => {
    return dao.find({ limit, offset, query })
}

exports.get = id => dao.findOne({ query: { id } })

exports.getSourceJobs = (id, { limit, offset, query } = {}) => {
    return jobsDao.find({ limit, offset, query })
}

exports.load = async source => {
    return exports.types[source.type].load(source.data)
}

exports.create = async _source => {
    let source = _source

    const type = exports.types[source.type]
    if (_.isFunction(type.register)) {
        const data = await type.register(source.data)
        source.data = data
    }

    return dao.create(dbHelpers.uuid(source))
}

exports.update = dao.update