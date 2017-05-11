const uuid    = require('uuid')
const request = require('request-promise-native')


module.exports = config => source => {
    return request({
        baseUrl: config.get('meetup.host'),
        uri:     `/${source.data.urlname}/events`,
        method: 'GET',
        qs:     {
            key: config.get('meetup.api_key'),
        },
        json: true,
    })
        .then(events => {
            return events.map(event => ({
                title:        event.name,
                link:         event.link,
                external_id:  event.id,
                published_at: event.created,
                content:      event.description,
                source_id:    source.id,
                source_name:  source.name,
                source_type:  source.type,
            }))
        })
        .catch(err => {
            console.error(err)
        })
}