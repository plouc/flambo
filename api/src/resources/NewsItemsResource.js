'use strict'

const router           = require('express').Router()
const NewsItemsService = require('../services/NewsItemsService')
const rest             = require('../lib/middlewares/restMiddleware')


router.get(
    '/',
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


router.get('/:id', () => {

})


module.exports = router
