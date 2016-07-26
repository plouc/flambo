'use strict'

const router                = require('express').Router()
const rest                  = require('../lib/middlewares/restMiddleware')
const CollectionsRepository = require('../repositories/CollectionsRepository')
const NewsItemsService      = require('../services/NewsItemsService')
const container             = require('../container')


const auth = container.get('auth')


/**
 * Returns authenticated user collections.
 */
router.get(
    '/',
    auth.authenticate(),
    rest.fields(),
    rest.collection.sort('sort', ['name']),
    rest.collection.pagination(),
    (req, res) => {
        CollectionsRepository.findByUserId(req.user.id)
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
    CollectionsRepository.find(req.params.id)
        .then(collection => {
            if (collection === null) {
                res.status(404).send()
            } else {
                // collection should belong to current user or current user should be administrator
                if (collection.user_id !== req.user.id && !req.user.roles.includes('administrator')) {
                    res.status(403).json({ message: 'unauthorized' })
                } else {
                    res.json(collection)
                }
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
        console.log('/collections/:id/news_items')
        CollectionsRepository.find(req.params.id)
            .then(collection => {
                if (collection === null) {
                    res.status(404).send()
                } else {
                    if (collection.news_items.length > 0) {
                        const options = req.rest
                        options.sort    = Object.keys(options.sort).map(k => ({ [k]: { order: options.sort[k] } }))
                        options.filters = Object.assign(options.filters, { ids: collection.news_items })

                        return NewsItemsService.search(options)
                    } else {
                        return { docs: [], total: 0 }
                    }
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
    rest.collection.filters(['page', 'limit', 'sort']),
    (req, res) => {
        CollectionsRepository.find(req.params.id)
            .then(collection => {
                if (collection === null) {
                    res.status(404).send()
                } else {
                    if (collection.news_items.length > 0) {
                        const options = {
                            filters: Object.assign(req.rest.filters, { ids: collection.news_items })
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
            })
    }
)


router.put('/:id/add/:newsItemId', (req, res) => {
    const { id, newsItemId } = req.params

    CollectionsRepository.addNewsItem(id, newsItemId)
        .then(result => {
            console.log(result)
            res.json({ added: newsItemId })
        })
        .error(err => {
            console.error(err)
            res.status(500).send()
        })
})


router.put('/:id/remove/:newsItemId', (req, res) => {
    const { id, newsItemId } = req.params

    CollectionsRepository.removeNewsItem(id, newsItemId)
        .then(result => {
            console.log(result)
            res.json({ removed: newsItemId })
        })
        .error(err => {
            console.error(err)
            res.status(500).send()
        })
})


module.exports = router
