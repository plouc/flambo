const router            = require('express').Router();
const SourcesRepository = require('../repositories/SourcesRepository');


module.exports = container => {
    const r  = container.get('rethinkdb');
    const es = container.get('elastic');

    const repo = SourcesRepository(container);

    router.get('/', (req, res) => {
        repo.findAllWithThemes()
            .then(result => {
                res.json(result);
            })
            .error(err => {
                console.error(err);
            })
        ;
    });

    router.get('/:id', (req, res) => {
        repo.findWithThemes(req.params.id)
            .then(source => {
                if (source === null) {
                    res.status(404).send();
                } else {
                    res.json(source);
                }
            })
            .error(err => {
                console.error(err);
            })
        ;
    });

    router.get('/:id/news_items', (req, res) => {
        es.search({
            index: 'flambo',
            size:  200,
            body: {
                query : {
                    constant_score: {
                        filter: {
                            term: {
                                sourceId: req.params.id
                            }
                        }
                    }
                }
            }
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
            .catch(err => {
                console.error(err);
            })
        ;
    });

    router.post('/', (req, res) => {
        const sourceData = req.body;

        sourceData.createdAt = r.now();

        r.table('sources').insert(sourceData, { returnChanges: true }).run()
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
        ;
    });

    router.put('/:id', (req, res) => {
        const update = req.body;

        r.table('sources').get(req.params.id).update(update, {
            returnChanges: true
        })
            .then(result => {
                res.json(result.changes[0].new_val);
            })
            .error(err => {
                console.error(err);
            })
        ;
    });

    return router;
};
