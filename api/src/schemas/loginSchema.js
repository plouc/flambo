/**
 * @module schemas/LoginSchema
 */
'use strict'

const Joi = require('joi')


module.exports = {
    email:    Joi.string().email().required(),
    password: Joi.string().required(),
}
