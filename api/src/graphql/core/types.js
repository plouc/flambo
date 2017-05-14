const {
    GraphQLEnumType,
} = require('graphql')


exports.orderDirection = new GraphQLEnumType({
    name: 'OrderDirection',
    values: {
        ASC: {
            value: 'asc',
            description: 'order results in ascending order',
        },
        DESC: {
            value: 'desc',
            description: 'order results in descending order',
        },
    },
})
