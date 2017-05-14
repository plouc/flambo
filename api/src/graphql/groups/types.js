const {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLID,
} = require('graphql')

const coreTypes     = require('../core/types')
const userTypes     = require('../users/types')
const userResolvers = require('../users/resolvers')


exports.Group = new GraphQLObjectType({
    name:   'Group',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        member_is_administrator: {
            type: GraphQLBoolean,
        },
        owner: {
            type:    userTypes.User,
            resolve: userResolvers.resolveGroupOwner,
        },
    }),
})

const GroupOrderField = new GraphQLEnumType({
    name:   'GroupOrderField',
    values: {
        NAME: {
            value: 'name',
            description: 'order groups by name',
        },
        CREATED_AT: {
            value: 'created_at',
            description: 'order groups by creation date',
        },
    },
});

exports.GroupOrder = new GraphQLInputObjectType({
    name: 'GroupOrder',
    fields: {
        field: {
            type: new GraphQLNonNull(GroupOrderField),
        },
        direction: {
            type: new GraphQLNonNull(coreTypes.orderDirection),
        },
    },
})

exports.CreateGroupInput = new GraphQLInputObjectType({
    name: 'CreateGroupInput',
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        description: {
            type: GraphQLString,
        },
    },
})
