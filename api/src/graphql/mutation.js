const { GraphQLObjectType } = require('graphql')

const collections           = require('./collections/mutations')
const groups                = require('./groups/mutations')


module.exports = () => new GraphQLObjectType({
    name:        'Mutation',
    description: 'This is the main mutation type, grouping all available mutations',
    fields:      () =>  Object.assign({},
        collections(),
        groups()
    ),
})