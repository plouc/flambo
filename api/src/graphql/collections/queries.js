const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
} = require('graphql')

const collectionTypes     = require('./types')
const collectionResolvers = require('./resolvers')


module.exports = () => ({
    collections: {
        type: new GraphQLList(collectionTypes.Collection),
        args: {
            limit: {
                type: GraphQLInt,
            },
            offset: {
                type: GraphQLInt,
            },
            orderBy: {
                type: collectionTypes.CollectionOrder,
            },
        },
        resolve: collectionResolvers.resolveCollections,
    },
    collection: {
        type: collectionTypes.Collection,
        args: {
            id: { type: GraphQLString },
        },
        resolve: collectionResolvers.resolveCollection,
    },
})
