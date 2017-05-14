const {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
} = require('graphql')

const userTypes     = require('./types')
const userResolvers = require('./resolvers')


module.exports = () => ({
    users: {
        type: new GraphQLList(userTypes.User),
        args: {
            limit: {
                type: GraphQLInt,
            },
            offset: {
                type: GraphQLInt,
            },
            orderBy: {
                type: userTypes.UserOrder,
            },
        },
        resolve: userResolvers.resolveUsers,
    },
    user: {
        type: userTypes.User,
        args: {
            id: { type: GraphQLString },
        },
        resolve: userResolvers.resolveUser,
    },
})
