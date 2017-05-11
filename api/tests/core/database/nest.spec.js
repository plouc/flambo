const dbHelpers = require('../../../src/core/database/helpers')

const {
    Nest,
} = dbHelpers

describe('Nest', () => {
    it('should return selected columns', () => {
        const n = Nest('user', ['id', 'name'])
        console.log(n)
    })
})


/*
describe('prefixColumns', () => {
    it('should prefix given columns with table name', () => {
        expect(dbHelpers.prefixColumns('test', ['id', 'name', 'whatever']))
            .toEqual([
                'test.id AS test__id',
                'test.name AS test__name',
                'test.whatever AS test__whatever',
            ])
    })
})

describe('extractUsingPrefix', () => {
    it('should return an object from properties matching prefix', () => {
        expect(dbHelpers.extractUsingPrefix({
            test__id:        1,
            test__name:      'test',
            test__whatever:  'whatever',
            other__prefixed: 'other prefixed',
            other:           'other',
        }, 'test'))
            .toEqual({
                id:       1,
                name:     'test',
                whatever: 'whatever',
            })
    })
})

describe('extractUsingPrefixes', () => {
    it('should return multiple objects from given prefixes', () => {
        expect(dbHelpers.extractUsingPrefixes({
            test__id:        1,
            test__name:      'test',
            test__whatever:  'whatever',
            other__id:       2,
            other__name:     'other',
        }, ['test', 'other']))
            .toEqual({
                test: {
                    id:       1,
                    name:     'test',
                    whatever: 'whatever',
                },
                other: {
                    id:       2,
                    name:     'other',
                },
            })
    })
})

describe('nestFrom', () => {
    it('should return selected columns', () => {
        const rows = [
            {
                user__id:   1,
                user__name: 'Raph',
            },
            {
                user__id:   2,
                user__name: 'Marcel',
            },
        ]

        expect.assertions(2)

        return dbHelpers.nestFrom('user', ['id', 'name'])
            .nest(select => {
                expect(select).toEqual([
                    'user.id AS user__id',
                    'user.name AS user__name',
                ])

                return Promise.resolve(rows)
            })
            .then(results => {
                expect(results).toEqual([
                    {
                        id:   1,
                        name: 'Raph',
                    },
                    {
                        id:   2,
                        name: 'Marcel',
                    },
                ])
            })
    })

    it('should support nesting one to one relation', () => {
        const rows = [
            {
                user__id:   1,
                user__name: 'Raph',
            },
            {
                user__id:   2,
                user__name: 'Marcel',
            },
        ]

        expect.assertions(2)

        dbHelpers.nestFrom('user', ['id', 'name'])
            .item('address', ['id', 'country'])
            .nest(select => {
                expect(select).toEqual([
                    'user.id AS user__id',
                    'user.name AS user__name',
                    'address.id AS address__id',
                    'address.country AS address__country',
                ])

                return Promise.resolve(rows)
            })
            .then(results => {
                expect(results).toEqual([
                    {
                        id:     1,
                        name:   'Raph',
                        address: null,
                    },
                    {
                        id:     2,
                        name:   'Marcel',
                        address: null,
                    },
                ])
            })
    })

    it('should support nesting one to many relation', () => {
        dbHelpers.nestFrom('user', ['id', 'name', 'email'])
            .items('groups', ['id', 'name'])
            .nest(select => {
                expect(select).toEqual([
                    'user.id AS user__id',
                    'user.name AS user__name',
                    'user.email AS user__email',
                    'groups.id AS groups__id',
                    'groups.name AS groups__name',
                ])

                return { then: () => {} }
            })
    })

    it('should support nesting mixed relations', () => {
        dbHelpers.nestFrom('user', ['id', 'name', 'email'])
            .item('address', ['id', 'country', 'city'])
            .items('groups', ['id', 'name'])
            .nest(select => {
                expect(select).toEqual([
                    'user.id AS user__id',
                    'user.name AS user__name',
                    'user.email AS user__email',
                    'address.id AS address__id',
                    'address.country AS address__country',
                    'address.city AS address__city',
                    'groups.id AS groups__id',
                    'groups.name AS groups__name',
                ])

                return { then: () => {} }
            })
    })
})
*/