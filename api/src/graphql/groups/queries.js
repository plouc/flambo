const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLID,
} = require('graphql')

const groupTypes     = require('./types')
const groupResolvers = require('./resolvers')


module.exports = () => ({
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
        resolve: groupResolvers.resolveGroups,
    },
    group: {
        type: groupTypes.Group,
        args: {
            id: {
                type: GraphQLID,
            },
        },
        resolve: groupResolvers.resolveGroup,
    },
})
