'use strict'

const _                 = require('lodash')
const router            = require('express').Router()
const rest              = require('../lib/middlewares/restMiddleware')
const validation        = require('../lib/middlewares/validationMiddleware')
const schemas           = require('../schemas')
const SourcesRepository = require('../repositories/SourcesRepository')
const NewsItemsService  = require('../services/NewsItemsService')
const container         = require('../container')
const auth              = container.get('auth')


router.get(
    '/',
    auth.authenticate(),
    rest.fields(),
    rest.collection.sort({ allowedFields: ['type'] }),
    rest.collection.pagination(),
    (req, res) => {
        SourcesRepository.findAllWithTopics()
            .then(result => {
                res
                    .set({
                        'X-Total-Count': 10,
                    })
                    .json(result)
            })
            .error(err => {
                console.error(err)
            })
    }
)

router.get('/:id', auth.authenticate(), (req, res) => {
    SourcesRepository.findWithTopics(req.params.id)
        .then(source => {
            if (source === null) {
                res.status(404).send()
            } else {
                res.json(source)
            }
        })
        .error(err => {
            console.error(err)
            res.status(500).send()
        })
})

router.get(
    '/:id/news_items',
    auth.authenticate(),
    rest.collection.sort(),
    rest.collection.pagination({ perPage: { key: 'limit' } }),
    rest.collection.filters(['page', 'limit', 'sort']),
    (req, res) => {
        const options = req.rest
        options.sort    = Object.keys(options.sort).map(k => ({ [k]: { order: options.sort[k] } }))
        options.filters = Object.assign(options.filters, { sourceId: req.params.id })

        NewsItemsService.search(options)
            .then(({ total, docs }) => {
                res.set({
                    'X-Total': total,
                    'X-Limit': req.rest.pagination.limit,
                    'X-Page':  req.rest.pagination.page,
                }).json(docs)
            })
            .catch(err => {
                console.error(err)
            })
    }
)

router.get(
    '/:id/news_items/stats',
    auth.authenticate(),
    rest.collection.filters(['page', 'limit', 'sort']),
    (req, res) => {
        const options = {
            filters: Object.assign(req.rest.filters, { sourceId: req.params.id })
        }

        NewsItemsService.dateHistogram(options)
            .then(aggs => {
                res.json(aggs)
            })
            .catch(err => {
                console.error(err)
            })
    }
)

/**
 * Request source data collection.
 * It sends a message to the worker queue.
 */
router.post('/:id/collect', auth.authenticate(), (req, res) => {
    SourcesRepository.find(req.params.id)
        .then(source => {
            if (source === null) {
                res.status(404).send()
            } else {
                const producer = container.get('work_queue_producer')
                producer.send(req.params.id)
                    .then(() => {
                        res.status(202).send()
                    })
            }
        })
        .error(err => {
            console.error(err)
            res.status(500).send()
        })
})


router.post('/', auth.authenticate(), validation.validate(schemas.source), (req, res) => {
    if (!req.user.roles.includes('administrator')) {
        return res.status(403).json({ message: 'unauthorized' })
    }

    const source = req.payload

    source.userId = req.user.id

    SourcesRepository.insert(source)
        .then(createdSource => {
            res.status(201).json(createdSource)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send()
        })
})

router.put('/:id', auth.authenticate(), validation.validate(schemas.source, { omit: ['id'] }), (req, res) => {
    if (!req.user.roles.includes('administrator')) {
        return res.status(403).json({ message: 'unauthorized' })
    }

    const { id } = req.params
    const source = req.payload

    SourcesRepository.update(id, source)
        .then(updatedSource => {
            res.json(updatedSource)
        })
        .error(err => {
            console.error(err)
            res.status(500).send()
        })
})


module.exports = router
