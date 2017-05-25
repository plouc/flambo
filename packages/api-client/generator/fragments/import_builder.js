module.exports = {
    type: 'VariableDeclaration',
    kind: 'const',
    declarations: [
        {
            type: 'VariableDeclarator',
            id: {
                type: 'Identifier',
                name: 'builder',
            },
            init: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'require',
                },
                arguments: [
                    {
                        type: 'StringLiteral',
                        value: './builder',
                    }
                ],
            },
        },
    ],
}
