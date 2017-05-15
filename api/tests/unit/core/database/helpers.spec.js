const helpers = require('../../../../src/core/database/helpers')


describe('prefix', () => {
    it('should prefix given columns with table name', () => {
        expect(helpers.prefix('test', ['id', 'name', 'whatever']))
            .toEqual([
                'test.id AS test__id',
                'test.name AS test__name',
                'test.whatever AS test__whatever',
            ])
    })
})

describe('extractWithPrefix', () => {
    it('should return an object from properties matching prefix', () => {
        expect(helpers.extractWithPrefix({
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

describe('extractWithPrefixes', () => {
    it('should return multiple objects from given prefixes', () => {
        expect(helpers.extractWithPrefixes({
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
