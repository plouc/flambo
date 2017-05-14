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


exports.Collection = new GraphQLObjectType({
    name:   'Collection',
    fields: () => ({
        id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        public: {
            type: GraphQLBoolean,
        },
        owner: {
            type: userTypes.User,
        },
    }),
})

const CollectionOrderField = new GraphQLEnumType({
    name:   'CollectionOrderField',
    values: {
        FIRST_NAME: {
            value: 'name',
            description: 'order collections by name',
        },
        LAST_NAME: {
            value: 'created_at',
            description: 'order collections by creation date',
        },
    },
});

exports.CollectionOrder = new GraphQLInputObjectType({
    name:   'CollectionOrder',
    fields: {
        field: {
            type: new GraphQLNonNull(CollectionOrderField),
        },
        direction: {
            type: new GraphQLNonNull(coreTypes.orderDirection),
        },
    },
})
