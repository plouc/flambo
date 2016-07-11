/**
 * @module schemas/SourceSchema
 */
'use strict'

const Joi = require('joi')

const twitterSchema = Joi.object().keys({
    user: Joi.string().required(),
})

const rssSchema = Joi.object().keys({
    url: Joi.string().required(),
});

const meetupSchema = Joi.object().keys({
       
});

module.exports = Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.any().valid([
        'twitter',
        'rss'
    ]).required(),
    data: Joi.alternatives()
        .when('type', { is: 'twitter', then: twitterSchema })
        .when('type', { is: 'rss',     then: rssSchema     })
        .when('type', { is: 'meetup',  then: meetupSchema  })
        .required()
})
