const {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
} = require('graphql')

const coreTypes = require('../core/types')
const userTypes = require('../users/types')


exports.Source = new GraphQLObjectType({
    name:   'Source',
    fields: () => ({
        id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        type: {
            type: GraphQLString,
        },
        owner: {
            type: userTypes.User,
        },
    }),
})

const SourceOrderField = new GraphQLEnumType({
    name:   'SourceOrderField',
    values: {
        NAME: {
            value: 'name',
            description: 'order sources by name',
        },
        CREATED_AT: {
            value: 'created_at',
            description: 'order sources by creation date',
        },
    },
});

exports.SourceOrder = new GraphQLInputObjectType({
    name: 'SourceOrder',
    fields: {
        field: {
            type: new GraphQLNonNull(SourceOrderField),
        },
        direction: {
            type: new GraphQLNonNull(coreTypes.orderDirection),
        },
    },
})
