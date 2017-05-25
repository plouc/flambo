module.exports = module => ({
    type: 'ExpressionStatement',
    expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
            type: 'MemberExpression',
            object: {
                type: 'Identifier',
                name: 'exports',
            },
            property: {
                type: 'Identifier',
                name: module,
            },
        },
        right: {
            type: 'CallExpression',
            callee: {
                type: 'Identifier',
                name: 'require',
            },
            arguments: [{
                type: 'StringLiteral',
                value: `./${module}`,
            }],
        },
    },
})