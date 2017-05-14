const Joi = require('joi')


const rssSchema = Joi.object().keys({
    url: Joi.string().uri().required(),
})

const meetupSchema = Joi.object().keys({
    urlname: Joi.string().required(),
})

exports.create = Joi.object().keys({
    name:        Joi.string().required(),
    description: Joi.string().allow(null),
    type:        Joi.any().valid([
        'rss',
        'meetup',
    ]).required(),
    data:        Joi.alternatives()
        .when('type', { is: 'rss',    then: rssSchema })
        .when('type', { is: 'meetup', then: meetupSchema })
        .required()
})
