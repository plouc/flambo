const router           = require('express').Router();
const Joi              = require('joi');
const topicSchema      = require('../schemas/topicSchema');
const TopicsRepository = require('../repositories/TopicsRepository');


module.exports = container => {
    const r  = container.get('rethinkdb');
    const es = container.get('elastic');

    const repo = TopicsRepository(container);

    router.get('/', (req, res) => {
        repo.findAll()
            .then(result => {
                res.json(result);
            })
            .error(err => {
                console.error(err);
            })
        ;
    });

    router.get('/:id', (req, res) => {
        repo.findWithSources(req.params.id)
            .then(theme => {
                if (theme === null) {
                    res.status(404).send();
                } else {
                    res.json(theme);
                }
            })
            .error(err => {
                console.error(err);
            })
        ;
    });

    router.get('/:id/news_items', (req, res) => {
        r.table('sources').filter(doc => {
            return doc('topics').contains(req.params.id);
        }).run()
            .then(sources => sources.map(({ id }) => id))
            .then(sourceIds => {
                return es.search({
                    index: 'flambo',
                    size:  200,
                    body: {
                        query : {
                            constant_score: {
                                filter: {
                                    terms: {
                                        sourceId: sourceIds
                                    }
                                }
                            }
                        }
                    }
                });
            })
            .then(result => {
                const { total, hits } = result.hits;
                res.json({
                    docs: hits.map(({ _id, _source }) => {
                        _source.id = _id;

                        return _source;
                    }),
                    total
                });
            })
            .error(err => {
                console.error(err);
            })
        ;
    });

    router.post('/', (req, res, next) => {
        const data = req.body;

        Joi.validate(data, topicSchema, (err, value) => {
            if (err) {
                res.status(400).json({
                    errors: err.details
                });
            } else {
                value.createdAt = r.now();

                r.table('topics').insert(value, { returnChanges: true }).run()
                    .then(result => {
                        if (result.inserted !== 1) {
                            // @todo handle error…
                        } else {
                            res.status(201).json(result.changes[0].new_val);
                        }
                    })
                    .error(err => {
                        console.error(err);
                    })
                    .finally(next)
                ;
            }
        });
    });
    
    return router;
};
