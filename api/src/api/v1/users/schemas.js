const Joi = require('joi')

exports.createGroup = Joi.object().keys({
    name: Joi.string().required(),
})