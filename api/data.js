const loader = require('./data-loader/')

const collections = require('./fixtures/collections')
const sources     = require('./fixtures/sources')
const topics      = require('./fixtures/topics')
const users       = require('./fixtures/users')

loader.data({
    users: {
        a: {
            name: 'user a',
            pictures: ['$pictures:a.id']
        }
    },
    posts: {
        a: {
            name: 'post a',
            author: '$users:a.id',
        }
    },
    pictures: {
        a: {
            name: 'picture a',
            post: '$posts:a.id'
        }
    }
})