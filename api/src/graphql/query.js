const { GraphQLObjectType } = require('graphql')

const collections           = require('./collections/queries')
const groups                = require('./groups/queries')
const sources               = require('./sources/queries')
const users                 = require('./users/queries')


module.exports = () => new GraphQLObjectType({
    name:        'Query',
    description: 'This is the main query type, grouping all available entities',
    fields:      () =>  Object.assign({},
        collections(),
        groups(),
        sources(),
        users()
    ),
})