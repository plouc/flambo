'use strict'

const _                = require('lodash')
const router           = require('express').Router()
const Joi              = require('joi')
const rest             = require('../lib/middlewares/restMiddleware')
const topicSchema      = require('../schemas/topicSchema')
const TopicsRepository = require('../repositories/TopicsRepository')
const NewsItemsService = require('../services/NewsItemsService')


module.exports = container => {
    const r      = container.get('rethinkdb')
    const upload = container.get('upload')

    router.get(
        '/',
        rest.fields(),
        rest.collection.sort({ allowedFields: ['name'] }),
        rest.collection.pagination(),
        (req, res) => {
            TopicsRepository.findAll()
                .then(topics => {
                    res.json(topics.map(topic => {
                        if (topic.picture) {
                            topic.picture = `http://localhost:3000/uploads/${topic.picture}`
                        }

                        return topic
                    }))
                })
                .error(err => {
                    console.error(err)
                })
        }
    )

    router.get('/:id', (req, res) => {
        const { id } = req.params

        TopicsRepository.findWithSources(id)
            .then(topic => {
                if (topic === null) {
                    res.status(404).json({
                        message: `No topic found for id ${id}`,
                    })
                } else {
                    res.json(topic)
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
            r.table('sources').filter(doc => {
                return doc('topics').contains(req.params.id)
            }).run()
                .then(sources => sources.map(({ id }) => id))
                .then(sourceIds => {
                    if (sourceIds.length > 0) {
                        const options = req.rest
                        options.sort    = Object.keys(options.sort).map(k => ({ [k]: { order: options.sort[k] } }))
                        options.filters = Object.assign(options.filters, { sourceId: sourceIds })

                        return NewsItemsService.search(options)
                    }

                    return { docs: [], total: 0 }
                })
                .then(({ total, docs }) => {
                    res.set({
                        'X-Total': total,
                        'X-Limit': req.rest.pagination.limit,
                        'X-Page':  req.rest.pagination.page,
                    }).json(docs)
                })
                .error(err => {
                    console.error(err);
                })
        }
    )

    /**
     * Upload a picture for the topic.
     */
    router.post('/:id/picture', (req, res) => {
        upload.single('picture')(req, res, err => {
            if (!req.file || err) {
                return res.status(400).json({ message: 'an error occurred' })
            }

            const { filename } = req.file

            r.table('topics').get(req.params.id)
                .update({ picture: filename })
                .then(() => {
                    res.json({ picture: filename })
                })
                .error(err => {
                    console.error(err)
                    res.status(500).json({ message: 'an error occurred' })
                })
        })
    })

    router.post('/', (req, res, next) => {
        const data = req.body

        Joi.validate(data, topicSchema, (err, value) => {
            if (err) {
                res.status(400).json({
                    errors: err.details
                })
            } else {
                value.createdAt = r.now()

                r.table('topics').insert(value, { returnChanges: true }).run()
                    .then(result => {
                        if (result.inserted !== 1) {
                            // @todo handle error…
                        } else {
                            res.status(201).json(result.changes[0].new_val)
                        }
                    })
                    .error(err => {
                        console.error(err)
                    })
                    .finally(next)
            }
        })
    })

    router.put('/:id', (req, res) => {
        const update = req.body

        console.log('UPDATE', _.omit(update, ['id']))

        r.table('topics').get(req.params.id).update(_.omit(update, ['id']), {
            returnChanges: true,
        })
            .then(result => {
                const updatedTopic = result.changes.length > 0 ? result.changes[0].new_val : update
                res.json(updatedTopic)
            })
            .error(err => {
                console.error(err)
                res.status(500).send()
            })
    })

    return router
}
