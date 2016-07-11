const request = require('request');


const MEETUP_API_URL = 'https://api.meetup.com';


const tweetToNewsItem = tweet => {
    //console.log(tweet);
    const createdAt = new Date(tweet.created_at);

    return {
        content:    tweet.text,
        externalId: tweet.id,
        createdAt:  moment(createdAt).toISOString(),
    };
};


module.exports = config => {
    const { apiKey } = config;
    
    return {
        load(params) {
            console.log('MEETUP SOURCE', params)
            return new Promise((resolve, reject) => {
                const options = {
                    baseUrl: MEETUP_API_URL,
                    uri:     `/Osaka-Social-Networking-and-Language-Exchange/events`,
                    method: 'GET',
                    qs:     {
                        key: process.env.MEETUP_API_KEY
                    },
                    json: true,
                };

                console.log(options)

                request(options, (err, res) => {
                    console.log(res.statusCode, res.body)
                })
            });
        }
    }
};