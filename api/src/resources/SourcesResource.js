'use strict'

const _                 = require('lodash')
const router            = require('express').Router()
const Joi               = require('joi')
const rest              = require('../lib/middlewares/restMiddleware')
const sourceSchema      = require('../schemas/sourceSchema')
const SourcesRepository = require('../repositories/SourcesRepository')
const NewsItemsService  = require('../services/NewsItemsService')


module.exports = container => {
    const r         = container.get('rethinkdb')
    const producer  = container.get('work_queue_producer')

    router.get(
        '/',
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

    router.get('/:id', (req, res) => {
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

    /**
     * Request source data collection.
     * It sends a message to the worker queue.
     */
    router.post('/:id/collect', (req, res) => {
        SourcesRepository.find(req.params.id)
            .then(source => {
                if (source === null) {
                    res.status(404).send()
                } else {
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

    router.get('/:id/logs', rest.collection.pagination(), () => {
            
    })

    router.post('/', (req, res) => {
        const data = req.body

        Joi.validate(data, sourceSchema, (err, value) => {
            if (err) {
                res.status(400).json({
                    errors: err.details,
                })
            } else {
                value.createdAt = r.now()

                r.table('sources').insert(value, { returnChanges: true }).run()
                    .then(result => {
                        if (result.inserted !== 1) {
                            // @todo handle error…
                        } else {
                            res.status(201).json(result.changes[0].new_val)
                        }
                    })
                    .error(err => {
                        console.error(err)
                        res.status(500).send()
                    })
            }
        })
    })

    router.put('/:id', (req, res) => {
        const update = req.body

        console.log('UPDATE', _.omit(update, ['id']))

        r.table('sources').get(req.params.id).update(_.omit(update, ['id']), {
            returnChanges: true,
        })
            .then(result => {
                const updatedSource = result.changes.length > 0 ? result.changes[0].new_val : update
                res.json(updatedSource)
            })
            .error(err => {
                console.error(err)
                res.status(500).send()
            })
    })

    return router
}
