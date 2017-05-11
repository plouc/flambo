'use strict'

const passport                 = require('passport')
const passportJwt              = require('passport-jwt')
const { ExtractJwt, Strategy } = passportJwt


module.exports = jwtSecret => {
    const UsersRepository = require('../repositories/UsersRepository')

    const options = {
        secretOrKey:    jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
    }

    const strategy = new Strategy(options, (payload, done) => {
        UsersRepository.find(payload.id)
            .asCallback((err, user) => {
                if (err) {
                    return done(err, false)
                }

                if (!user) {
                    done(null, false)
                } else {
                    done(null, {
                        id:    user.id,
                        roles: user.roles || [],
                    })
                }
            })
    })

    passport.use(strategy)

    return {
        initialize:   () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}