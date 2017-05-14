const Joi = require('joi')


exports.create = Joi.object().keys({
    name:        Joi.string().required(),
    description: Joi.string().allow(null),
    picture_id:  Joi.string().allow(null),
})

exports.comment = Joi.object().keys({
    content: Joi.string().required(),
})
