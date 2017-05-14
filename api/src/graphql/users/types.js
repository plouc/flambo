const {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
} = require('graphql')

const coreTypes           = require('../core/types')
const groupTypes          = require('../groups/types')
const groupResolvers      = require('../groups/resolvers')
const collectionTypes     = require('../collections/types')
const collectionResolvers = require('../collections/resolvers')
const sourceTypes         = require('../sources/types')
const sourceResolvers     = require('../sources/resolvers')


exports.User = new GraphQLObjectType({
    name:   'User',
    fields: () => ({
        id: {
            type: GraphQLString,
        },
        first_name: {
            type: GraphQLString,
        },
        last_name: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        groups: {
            type: new GraphQLList(groupTypes.Group),
            args: {
                limit: {
                    type: GraphQLInt,
                },
                offset: {
                    type: GraphQLInt,
                },
                orderBy: {
                    type: groupTypes.GroupOrder,
                },
            },
            resolve: groupResolvers.resolveUserGroups,
        },
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
            resolve: collectionResolvers.resolveUserCollections,
        },
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
            //resolve: collectionResolvers.resolveUserCollections,
        },
    }),
})

const UserOrderField = new GraphQLEnumType({
    name:   'UserOrderField',
    values: {
        FIRST_NAME: {
            value: 'first_name',
            description: 'order users by first name',
        },
        LAST_NAME: {
            value: 'last_name',
            description: 'order users by last name',
        },
    },
});

exports.UserOrder = new GraphQLInputObjectType({
    name:   'UserOrder',
    fields: {
        field: {
            type: new GraphQLNonNull(UserOrderField),
        },
        direction: {
            type: new GraphQLNonNull(coreTypes.orderDirection),
        },
    },
})
