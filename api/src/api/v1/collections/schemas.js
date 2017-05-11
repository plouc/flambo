const Joi = require('joi')

exports.create = Joi.object().keys({
    name: Joi.string().required(),
})