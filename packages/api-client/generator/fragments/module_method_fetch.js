module.exports = {
    type: 'ReturnStatement',
    argument: {
        type: 'CallExpression',
        callee: {
            type: 'MemberExpression',
            object: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'fetch',
                },
                arguments: [
                    {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'req',
                        },
                        property: {
                            type: 'Identifier',
                            name: 'url',
                        },
                    },
                    {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'req',
                        },
                        property: {
                            type: 'Identifier',
                            name: 'options',
                        },
                    },
                ],
            },
            property: {
                type: 'Identifier',
                name: 'then',
            },
        },
        arguments: [
            {
                type: 'ArrowFunctionExpression',
                params: [
                    {
                        type: 'Identifier',
                        name: 'res',
                    },
                ],
                body: {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'res',
                        },
                        property: {
                            type: 'Identifier',
                            name: 'json',
                        },
                    },
                },
            },
        ],
    },
}
