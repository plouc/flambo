const router     = require('express').Router();
const Joi        = require('joi');
const gravatar   = require('gravatar');
const userSchema = require('../schemas/userSchema');


const appendGravatarUrl = user => {
    user.gravatarUrl = gravatar.url(user.email, { protocol: 'https' });

    return user;
};


module.exports = container => {
    const r = container.get('rethinkdb');

    router.get('/', (req, res, next) => {
        r.table('users').run()
            .then(users => {
                res.json(users.map(user => {
                    return appendGravatarUrl(user);
                }));
            })
            .error(err => {
                console.error(err);
            })
            .finally(next)
        ;
    });


    router.get('/:id', (req, res, next) => {

    });


    router.post('/', (req, res, next) => {
        const userData = req.body;

        Joi.validate(userData, userSchema, (err, value) => {
            if (err) {
                res.status(400).json(err.details);
            } else {
                value.createdAt = r.now();

                r.table('users').insert(value, { returnChanges: true }).run()
                    .then(result => {
                        if (result.inserted !== 1) {
                            //handleError(res, next)(new Error("Document was not inserted."));
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
