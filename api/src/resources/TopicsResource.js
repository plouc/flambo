'use strict'

const _                = require('lodash')
const router           = require('express').Router()
const rest             = require('../lib/middlewares/restMiddleware')
const validation       = require('../lib/middlewares/validationMiddleware')
const schemas          = require('../schemas')
const TopicsRepository = require('../repositories/TopicsRepository')
const UsersRepository  = require('../repositories/UsersRepository')
const NewsItemsService = require('../services/NewsItemsService')
const container        = require('../container')
const r                = container.get('rethinkdb')
const upload           = container.get('upload')
const auth             = container.get('auth')

const fixPicturePath = topic => {
    if (topic.picture) {
        topic.picture = `http://localhost:3000/uploads/${topic.picture}`
    }

    return topic
}



router.get(
    '/',
    auth.authenticate(),
    rest.fields(),
    rest.collection.sort({ allowedFields: ['name'] }),
    rest.collection.pagination(),
    (req, res) => {
        const userId = req.user.id

        Promise.all([
            UsersRepository.find(userId),
            TopicsRepository.findAll(),
        ])
        .then(([user, topics]) => {
            res.json(topics.map(fixPicturePath).map(topic => Object.assign({}, topic, {
                subscribed: user.subscriptions.includes(topic.id),
            })))
        })
        .catch(err => {
            console.error(err)
            res.status(500).send()
        })
    }
)

/**
 * Gets a topic.
 * Note than unlike the / endpoint, it returns embedded sources.
 */
router.get('/:id', auth.authenticate(), (req, res) => {
    const { id } = req.params

    TopicsRepository.findWithSources(id)
        .then(topic => {
            if (topic === null) {
                res.status(404).json({
                    message: `No topic found for id ${id}`,
                })
            } else {
                res.json(fixPicturePath(topic))
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
        const { id } = req.params

        TopicsRepository.find(id)
            .then(topic => {
                if (topic === null) {
                    res.status(404).json({
                        message: `No topic found for id ${id}`,
                    })
                } else {
                    if (topic.sources && topic.sources.length > 0) {
                        const options = req.rest
                        options.sort    = Object.keys(options.sort).map(k => ({ [k]: { order: options.sort[k] } }))
                        options.filters = Object.assign(options.filters, { sourceId: topic.sources })

                        return NewsItemsService.search(options)
                    }

                    return { docs: [], total: 0 }
                }
            })
            .then(({ total, docs }) => {
                res.set({
                    'X-Total': total,
                    'X-Limit': req.rest.pagination.limit,
                    'X-Page':  req.rest.pagination.page,
                }).json(docs)
            })
            .error(err => {
                console.error(err)
                res.status(500).send()
            })
    }
)

router.get(
    '/:id/news_items/stats',
    auth.authenticate(),
    rest.collection.filters(['page', 'limit', 'sort']),
    (req, res) => {
        const { id } = req.params

        TopicsRepository.find(id)
            .then(topic => {
                if (topic === null) {
                    res.status(404).json({
                        message: `No topic found for id ${id}`,
                    })
                } else {
                    if (topic.sources && topic.sources.length > 0) {
                        const options = {
                            filters: Object.assign(req.rest.filters, { sourceId: topic.sources })
                        }

                        return NewsItemsService.dateHistogram(options)
                    }

                    return { months: [], sourceTypes: [] }
                }
            })
            .then(aggs => {
                res.json(aggs)
            })
            .error(err => {
                console.error(err)
                res.status(500).send()
            })
    }
)

/**
 * Subscribe to topic.
 */
router.post('/:id/subscribe', auth.authenticate(), (req, res) => {
    const userId  = req.user.id
    const topicId = req.params.id

    Promise.all([
        UsersRepository.find(userId),
        TopicsRepository.find(topicId),
    ])
    .then(([user, topic]) => {
        if (user === null || topic === null) {
            res.status(404).send()
        } else {
            return UsersRepository.addSubscription(userId, topicId)
            .then(() => {
                res.json({ subscribed: true })
            })
        }
    })
    .catch(err => {
        console.error(err)
        res.status(500).send()
    })
})

/**
 * Unsubscribe to topic.
 */
router.post('/:id/unsubscribe', auth.authenticate(), (req, res) => {
    const userId  = req.user.id
    const topicId = req.params.id

    Promise.all([
        UsersRepository.find(userId),
        TopicsRepository.find(topicId),
    ])
        .then(([user, topic]) => {
            if (user === null || topic === null) {
                res.status(404).send()
            } else {
                return UsersRepository.removeSubscription(userId, topicId)
                .then(() => {
                    res.json({ subscribed: false })
                })
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).send()
        })
})

/**
 * Upload a picture for the topic.
 */
router.post('/:id/picture', auth.authenticate(), (req, res) => {
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

/**
 * Topic creation.
 */
router.post('/', auth.authenticate(), validation.validate(schemas.topic), (req, res) => {
    if (!req.user.roles.includes('administrator')) {
        return res.status(403).json({ message: 'unauthorized' })
    }

    const topic = req.payload

    TopicsRepository.insert(topic)
        .then(createdTopic => {
            res.status(201).json(createdTopic)
        })
        .error(err => {
            console.error(err)
            res.status(500).send()
        })
})

/**
 * Topic update.
 */
router.put('/:id', auth.authenticate(), validation.validate(schemas.topic, { omit: ['id'] }), (req, res) => {
    if (!req.user.roles.includes('administrator')) {
        return res.status(403).json({ message: 'unauthorized' })
    }

    const { id } = req.params
    const topic  = req.payload

    TopicsRepository.update(id, topic)
        .then(updatedTopic => {
            res.json(updatedTopic)
        })
        .error(err => {
            console.error(err)
            res.status(500).send()
        })
})

/**
 * Topic delete.
 */
router.delete('/:id', auth.authenticate(), (req, res) => {
    if (!req.user.roles.includes('administrator')) {
        return res.status(403).json({ message: 'unauthorized' })
    }
})

module.exports = router
