const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
} = require('graphql')

const collectionTypes = require('./types')


module.exports = () => ({
    createCollection: {
        type: collectionTypes.Collection,
        args: {
            collection: {
                type: new GraphQLNonNull(collectionTypes.CreateCollectionInput),
            },
        },
        resolve: (_, args) => {
            return args.collection
        },
    },
    updateCollection: {
        type: collectionTypes.Collection,
        args: {
            collection: {
                type: new GraphQLNonNull(collectionTypes.CreateCollectionInput),
            },
        },
        resolve: (_, args) => {
            return args.collection
        },
    },
})
