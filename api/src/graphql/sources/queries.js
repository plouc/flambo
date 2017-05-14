const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
} = require('graphql')

const sourceTypes     = require('./types')
const sourceResolvers = require('./resolvers')


module.exports = () => ({
    sources: {
        type: new GraphQLList(sourceTypes.Source),
        args: {
            limit: {
                type: GraphQLInt,
            },
            offset: {
                type: GraphQLInt,
            },
            orderBy: {
                type: sourceTypes.SourceOrder,
            },
        },
        resolve: sourceResolvers.resolveSources,
    },
    source: {
        type: sourceTypes.Source,
        args: {
            id: {
                type: GraphQLString,
            },
        },
        resolve: sourceResolvers.resolveSource,
    },
})
