/**
 * @module schemas/TopicSchema
 */
'use strict'

const Joi = require('joi')


module.exports = {
    name:        Joi.string().min(2, 'utf8').required(),
    description: Joi.string().min(5, 'utf8').required(),
    sources:     Joi.array().items(Joi.string()).required(),
}
