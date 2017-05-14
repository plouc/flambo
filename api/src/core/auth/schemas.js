const Joi = require('joi')


exports.login = Joi.object().keys({
    login:    Joi.string().required(),
    password: Joi.string().required(),
})
