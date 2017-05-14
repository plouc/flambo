const Joi = require('joi')

exports.create = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name:  Joi.string().required(),
    groups:     Joi.array().items(Joi.string()).unique().default([]),
})