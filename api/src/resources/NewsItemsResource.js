'use strict'

const router           = require('express').Router()
const NewsItemsService = require('../services/NewsItemsService')
const rest             = require('../lib/middlewares/restMiddleware')
const container        = require('../container')
const auth             = container.get('auth')


router.get(
    '/',
    auth.authenticate(),
    rest.collection.sort({ allowedFields: ['createdAt'] }),
    rest.collection.pagination({ perPage: { key: 'limit' } }),
    rest.collection.filters(['page', 'limit', 'sort']),
    (req, res) => {
        const options = req.rest
        options.sort = Object.keys(options.sort).map(k => ({ [k]: { order: options.sort[k] } }))

        NewsItemsService.search(options)
            .then(({ total, docs }) => {
                res.set({
                    'X-Total': total,
                    'X-Limit': req.rest.pagination.limit,
                    'X-Page':  req.rest.pagination.page,
                }).json(docs)
            })
    }
)


router.get(
    '/stats',
    auth.authenticate(),
    rest.collection.filters(['page', 'limit', 'sort']),
    (req, res) => {
        const options = { filters: req.rest.filters }

        NewsItemsService.dateHistogram(options)
            .then(aggs => {
                res.json(aggs)
            })
            .catch(err => {
                console.error(err)
            })
    }
)


module.exports = router
