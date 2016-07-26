'use strict'

const router          = require('express').Router()
const jwt             = require('jwt-simple')
const UsersRepository = require('../repositories/UsersRepository')
const validation      = require('../lib/middlewares/validationMiddleware')
const schemas         = require('../schemas')
const UserMapper      = require('../mappers/UserMapper')
const container       = require('../container')
const r               = container.get('rethinkdb')
const auth            = container.get('auth')


router.post('/token', validation.validate(schemas.login), (req, res) => {
    const { email, password } = req.payload

    UsersRepository.findByEmail(email)
        .then(user => {
            if (user) {
                if (user.loginAttempts >= 3) {
                    res.status(401).json({ error: 'account_locked' })
                } else if (user.password !== password) {
                    UsersRepository.incrementLoginAttempts(user.id)
                        .then(() => {
                            res.status(401).json({ error: 'invalid_credentials' })
                        })
                } else {
                    UsersRepository.loginSuccessUpdate(user.id)
                        .then(() => {
                            const payload    = { id: user.id }
                            const token      = jwt.encode(payload, container.get('jwt_secret'))
                            const mappedUser = UserMapper.mapUser(user)

                            res.json({
                                token,
                                name:        mappedUser.name,
                                gravatarUrl: mappedUser.gravatarUrl,
                                roles:       mappedUser.roles,
                            })
                        })
                }
            } else {
                res.status(401).json({ error: 'invalid_credentials' })
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ ok: false })
        })
})

router.get('/', auth.authenticate(), (req, res) => {
    if (!req.user.roles.includes('administrator')) {
        res.status(403).send()
    } else {
        UsersRepository.findAll()
            .then(users => {
                res.json(UserMapper.mapUsers(users))
            })
            .error(err => {
                console.error(err)
                res.status(500).send()
            })
    }
})


router.get('/me', auth.authenticate(), (req, res) => {
    UsersRepository.find(req.user.id)
        .then(user => {
            if (user === null) {
                res.status(404).send()
            } else {
                res.json(UserMapper.mapUser(user))
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).send()
        })
})


router.get('/:id', auth.authenticate(), (req, res) => {
    if (!req.user.roles.includes('administrator')) {
        res.status(403).send()
    } else {
        UsersRepository.find(req.params.id)
            .then(user => {
                if (user === null) {
                    res.status(404).send()
                } else {
                    res.json(UserMapper.mapUser(user))
                }
            })
            .catch(err => {
                console.error(err)
                res.status(500).send()
            })
    }
})


router.post('/', auth.authenticate(), validation.validate(schemas.user), (req, res, next) => {
    const userData = req.payload

    userData.createdAt = r.now()

    //noinspection Eslint
    r.table('users').insert(userData, { returnChanges: true }).run()
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
})


module.exports = router
