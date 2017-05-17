const request = require('request-promise-native')


module.exports = config => data => {
    return request({
        baseUrl: config.get('meetup.host'),
        uri:     `/${data.urlname}`,
        method: 'GET',
        qs:     {
            key: config.get('meetup.api_key'),
        },
        json: true,
    })
        .then(groupInfo => {
            return {
                urlname: groupInfo.urlname,
                url:     groupInfo.link,
                name:    groupInfo.name,
                country: groupInfo.country,
                city:    groupInfo.city,
            }
        })
}
