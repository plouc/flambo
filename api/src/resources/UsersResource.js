'use strict'

const router          = require('express').Router()
const Joi             = require('joi')
const gravatar        = require('gravatar')
const UsersRepository = require('../repositories/UsersRepository')
const userSchema      = require('../schemas/userSchema')


const appendGravatarUrl = user => {
    user.gravatarUrl = gravatar.url(user.email, { protocol: 'https' })

    return user
}


module.exports = container => {
    const r = container.get('rethinkdb')

    router.get('/', (req, res, next) => {
        r.table('users').run()
            .then(users => {
                res.json(users.map(appendGravatarUrl))
            })
            .error(err => {
                console.error(err)
            })
            .finally(next)
    })


    router.get('/:id', (req, res) => {
        UsersRepository.find(req.params.id)
            .then(user => {
                if (user === null) {
                    res.status(404).send()
                } else {
                    res.json(appendGravatarUrl(user))
                }
            })
            .error(err => {
                console.error(err)
                res.status(500).send()
            })
    })


    router.post('/', (req, res, next) => {
        const userData = req.body

        Joi.validate(userData, userSchema, (err, value) => {
            if (err) {
                res.status(400).json(err.details)
            } else {
                value.createdAt = r.now()

                r.table('users').insert(value, { returnChanges: true }).run()
                    .then(result => {
                        if (result.inserted !== 1) {
                            //handleError(res, next)(new Error("Document was not inserted."));
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

    return router
}
