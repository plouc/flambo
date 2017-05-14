const { GraphQLSchema } = require('graphql')

const query = require('./query')


const schema = new GraphQLSchema({
    query: query(),
})

module.exports = schema
