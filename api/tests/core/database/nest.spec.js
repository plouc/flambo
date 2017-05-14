const nest = require('../../../src/core/database/nest')


it('should return selected columns', () => {
    const nesting = nest('user', ['id', 'name'])

    expect(nesting.selection()).toEqual([
        'user.id AS user__id',
        'user.name AS user__name',
    ])

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

    expect(nesting.rollup(rows)).toEqual([
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

it('should nest one to one relation', () => {
    const nesting = nest('user', ['id', 'name'])
        .one('address', ['id', 'country'])

    expect(nesting.selection()).toEqual([
        'user.id AS user__id',
        'user.name AS user__name',
        'address.id AS address__id',
        'address.country AS address__country',
    ])

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

    expect(nesting.rollup(rows)).toEqual([
        {
            id:     1,
            name:   'Raph',
            address: {},
        },
        {
            id:     2,
            name:   'Marcel',
            address: {},
        },
    ])
})

it('should nest one to many relation', () => {
    const nesting = nest('user', ['id', 'name'])
        .many('groups', ['id', 'name'])

    expect(nesting.selection()).toEqual([
        'user.id AS user__id',
        'user.name AS user__name',
        'groups.id AS groups__id',
        'groups.name AS groups__name',
    ])
})

it('should nest mixed relations', () => {
    const nesting = nest('user', ['id', 'name'])
        .one('address', ['id', 'country'])
        .many('groups', ['id', 'name'])

    expect(nesting.selection()).toEqual([
        'user.id AS user__id',
        'user.name AS user__name',
        'address.id AS address__id',
        'address.country AS address__country',
        'groups.id AS groups__id',
        'groups.name AS groups__name',
    ])
})

it('should deep nest one to one relations', () => {
    const nesting = nest('user', ['id', 'name'])
        // first branch address -> location -> veracity
        .one('address',  ['id', 'country'])
        .one('location', ['id', 'lat', 'lon'], { parent: 'address'  })
        .one('veracity', ['weight'],           { parent: 'address.location' })
        // second branch job -> company
        .one('job',      ['id', 'name'])
        .one('company',  ['id', 'name'], { parent: 'job'  })

    expect(nesting.selection()).toEqual([
        'user.id AS user__id',
        'user.name AS user__name',
        'address.id AS address__id',
        'address.country AS address__country',
        'location.id AS location__id',
        'location.lat AS location__lat',
        'location.lon AS location__lon',
        'veracity.weight AS veracity__weight',
        'job.id AS job__id',
        'job.name AS job__name',
        'company.id AS company__id',
        'company.name AS company__name',
    ])

    const rows = [
        {
            user__id:         1,
            user__name:       'Raph',
            address__id:      null,
            address__country: null,
            location__id:     null,
            location__lat:    null,
            location__lon:    null,
            veracity__weight: null,
            job__id:          null,
            job__name:        null,
            company__id:      null,
            company__name:    null,
        },
        {
            user__id:         2,
            user__name:       'Marcel',
            address__id:      2,
            address__country: 'France',
            location__id:     null,
            location__lat:    null,
            location__lon:    null,
            veracity__weight: null,
            job__id:          null,
            job__name:        null,
            company__id:      null,
            company__name:    null,
        },
        {
            user__id:         3,
            user__name:       'Clovis',
            address__id:      3,
            address__country: 'Japan',
            location__id:     3,
            location__lat:    10,
            location__lon:    20,
            veracity__weight: null,
            job__id:          3,
            job__name:        'dev',
            company__id:      null,
            company__name:    null,
        },
        {
            user__id:         4,
            user__name:       'Robert',
            address__id:      4,
            address__country: 'France',
            location__id:     4,
            location__lat:    10,
            location__lon:    20,
            veracity__weight: 1,
            job__id:          4,
            job__name:        'hr',
            company__id:      4,
            company__name:    'plouc',
        },
    ]

    expect(nesting.rollup(rows)).toEqual([
        {
            id:      1,
            name:    'Raph',
            address: null,
            job:     null,
        },
        {
            id:      2,
            name:    'Marcel',
            address: {
                id:       2,
                country:  'France',
                location: null,
            },
            job:     null,
        },
        {
            id:      3,
            name:    'Clovis',
            address: {
                id:       3,
                country:  'Japan',
                location: {
                    id:       3,
                    lat:      10,
                    lon:      20,
                    veracity: null,
                },
            },
            job:     {
                id:      3,
                name:    'dev',
                company: null,
            },
        },
        {
            id:      4,
            name:    'Robert',
            address: {
                id:       4,
                country:  'France',
                location: {
                    id:  4,
                    lat: 10,
                    lon: 20,
                    veracity: {
                        weight: 1,
                    },
                },
            },
            job:     {
                id:      4,
                name:    'hr',
                company: {
                    id:   4,
                    name: 'plouc',
                },
            },
        },
    ])
})

it('should deep nest mixed relations', () => {
    const nesting = nest('company', ['id', 'name'])
        .many('employees', ['id', 'name'])
        .one('team',       ['id', 'name'], { parent: 'employees' })
        .many('roles',     ['id', 'name'], { parent: 'employees.team' })
        .many('skills',    ['id', 'name'], { parent: 'employees' })

    expect(nesting.selection()).toEqual([
        'company.id AS company__id',
        'company.name AS company__name',
        'employees.id AS employees__id',
        'employees.name AS employees__name',
        'team.id AS team__id',
        'team.name AS team__name',
        'roles.id AS roles__id',
        'roles.name AS roles__name',
        'skills.id AS skills__id',
        'skills.name AS skills__name',
    ])

    const rows = [
        {
            company__id:     1,
            company__name:   'plouc inc',
            employees__id:   1,
            employees__name: 'Raph',
            team__id:        null,
            team__name:      null,
            roles__id:       null,
            roles__name:     null,
            skills__id:      1,
            skills__name:    'Node.js',
        },
        {
            company__id:     1,
            company__name:   'plouc inc',
            employees__id:   1,
            employees__name: 'Raph',
            team__id:        null,
            team__name:      null,
            roles__id:       null,
            roles__name:     null,
            skills__id:      2,
            skills__name:    'javascript',
        },
        {
            company__id:     1,
            company__name:   'plouc inc',
            employees__id:   2,
            employees__name: 'Marcel',
            team__id:        1,
            team__name:      'design',
            roles__id:       1,
            roles__name:     'DC',
            skills__id:      null,
            skills__name:    null,
        },
        {
            company__id:     1,
            company__name:   'plouc inc',
            employees__id:   2,
            employees__name: 'Marcel',
            team__id:        1,
            team__name:      'design',
            roles__id:       2,
            roles__name:     'DA',
            skills__id:      null,
            skills__name:    null,
        },
        {
            company__id:     1,
            company__name:   'plouc inc',
            employees__id:   3,
            employees__name: 'Sabine',
            team__id:        2,
            team__name:      'design',
            roles__id:       1,
            roles__name:     'DC',
            skills__id:      3,
            skills__name:    'photoshop',
        },
        {
            company__id:     1,
            company__name:   'plouc inc',
            employees__id:   3,
            employees__name: 'Sabine',
            team__id:        2,
            team__name:      'design',
            roles__id:       2,
            roles__name:     'DA',
            skills__id:      4,
            skills__name:    'illustrator',
        },
    ]

    expect(nesting.rollup(rows)).toEqual([
        {
            id:        1,
            name:      'plouc inc',
            employees: [
                {
                    id:     1,
                    name:   'Raph',
                    team:   null,
                    skills: [
                        {
                            id:   1,
                            name: 'Node.js',
                        },
                        {
                            id:   2,
                            name: 'javascript',
                        },
                    ],
                },
                {
                    id:     2,
                    name:   'Marcel',
                    skills: [],
                    team:   {
                        id:    1,
                        name:  'design',
                        roles: [
                            {
                                id:   1,
                                name: 'DC',
                            },
                            {
                                id:   2,
                                name: 'DA',
                            },
                        ],
                    },
                },
                {
                    id:     3,
                    name:   'Sabine',
                    skills: [
                        {
                            id:   3,
                            name: 'photoshop',
                        },
                        {
                            id:   4,
                            name: 'illustrator',
                        }
                    ],
                    team:   {
                        id:    2,
                        name:  'design',
                        roles: [
                            {
                                id:   1,
                                name: 'DC',
                            },
                            {
                                id:   2,
                                name: 'DA',
                            },
                        ],
                    },
                },
            ],
        },
    ])
})
