const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
} = require('graphql')

const groupTypes = require('./types')


module.exports = () => ({
    createGroup: {
        type: groupTypes.Group,
        args: {
            group: {
                type: new GraphQLNonNull(groupTypes.CreateGroupInput),
            },
        },
        resolve: (_, args) => {
            return args.group
        },
    },
})
