exports.up = knex => {
    const serialDefault = knex.raw(`extract(epoch from now())::bigint::text || LPAD(nextval('serial_seq')::text, 20, '0')`)

    return Promise.all([
        // this is used to generate unique serials used for cursor based pagination
        knex.raw(`CREATE SEQUENCE "serial_seq"`),
        knex.schema.createTable('groups', t => {
            t.uuid('id').primary()
            t.string('slug').notNullable()
            t.unique('slug')
            t.string('name').notNullable()
            t.text('description')
            t.uuid('owner_id').notNullable()
            t.foreign('owner_id').references('users.id')
            t.uuid('picture_id').nullable()
            t.foreign('picture_id').references('media.id')
            t.timestamp('created_at').defaultTo(knex.fn.now())
            t.timestamp('updated_at').defaultTo(knex.fn.now())
        }),
        knex.schema.createTable('users', t => {
            t.uuid('id').primary()
            t.string('first_name').notNullable()
            t.string('last_name').notNullable()
            t.string('email').notNullable()
            t.string('password').notNullable()
            t.string('role').notNullable()
            t.text('intro').nullable()
            t.uuid('avatar_id').nullable()
            t.foreign('avatar_id').references('media.id')
            t.timestamp('created_at').defaultTo(knex.fn.now())
            t.timestamp('updated_at').defaultTo(knex.fn.now())
        }),
        knex.schema.createTable('tags', t => {
            t.uuid('id').primary()
            t.string('name').notNullable()
        }),
        knex.schema.createTable('sources', t => {
            t.uuid('id').primary()
            t.string('name').notNullable()
            t.text('description')
            t.string('type').notNullable()
            t.json('data').notNullable()
            t.uuid('owner_id').notNullable()
            t.foreign('owner_id').references('users.id')
            t.timestamp('created_at').defaultTo(knex.fn.now())
            t.timestamp('updated_at').defaultTo(knex.fn.now())
        }),
        knex.schema.createTable('groups_sources', t => {
            t.uuid('group_id').notNullable()
            t.foreign('group_id').references('groups.id')
            t.uuid('source_id').notNullable()
            t.foreign('source_id').references('sources.id')
            t.unique(['group_id', 'source_id'])
            t.timestamp('created_at').defaultTo(knex.fn.now())
        }),
        knex.schema.createTable('source_jobs', t => {
            t.uuid('id').primary()
            t.uuid('source_id').notNullable()
            t.foreign('source_id').references('sources.id')
            t.string('status').notNullable()
        }),
        knex.schema.createTable('collections', t => {
            t.uuid('id').primary()
            t.string('name').notNullable()
            t.text('description')
            t.boolean('public').defaultTo(false)
            t.uuid('owner_id').notNullable()
            t.foreign('owner_id').references('users.id')
            t.uuid('picture_id').nullable()
            t.foreign('picture_id').references('media.id')
            t.json('selection').notNullable()
            t.timestamp('created_at').defaultTo(knex.fn.now())
            t.timestamp('updated_at').defaultTo(knex.fn.now())
        }),
        knex.schema.createTable('collections_subscribers', t => {
            t.uuid('collection_id').notNullable()
            t.foreign('collection_id').references('collections.id')
            t.uuid('user_id').notNullable()
            t.foreign('user_id').references('users.id')
            t.unique(['collection_id', 'user_id'])
            t.boolean('is_contributor').defaultTo(false)
            t.timestamp('created_at').defaultTo(knex.fn.now())
        }),
        knex.schema.createTable('users_groups', t => {
            t.uuid('user_id').notNullable()
            t.foreign('user_id').references('users.id')
            t.uuid('group_id').notNullable()
            t.foreign('group_id').references('groups.id')
            t.unique(['user_id', 'group_id'])
            t.boolean('is_administrator').defaultTo(false)
            t.timestamp('created_at').defaultTo(knex.fn.now())
        }),
        knex.schema.createTable('media', t => {
            t.uuid('id').primary()
            t.string('filename').notNullable()
            t.string('mimetype').notNullable()
            t.string('path').notNullable()
        }),
        knex.schema.createTable('comments', t => {
            t.uuid('id').primary()
            t.uuid('author_id').notNullable()
            t.foreign('author_id').references('users.id')
            t.uuid('group_id').nullable()
            t.foreign('group_id').references('groups.id')
            t.uuid('collection_id').nullable()
            t.foreign('collection_id').references('collections.id')
            t.text('content').notNullable()

            t.text('serial').notNullable().defaultTo(serialDefault)
            t.unique('serial')

            t.timestamp('created_at').defaultTo(knex.fn.now())
            t.timestamp('updated_at').defaultTo(knex.fn.now())
        })
    ])
}

exports.down = knex => knex.schema.dropTable('users_groups')
    .then(() => knex.schema.dropTable('comments'))
    .then(() => knex.schema.dropTable('groups_sources'))
    .then(() => knex.schema.dropTable('groups'))
    .then(() => knex.schema.dropTable('collections_subscribers'))
    .then(() => knex.schema.dropTable('collections'))
    .then(() => knex.schema.dropTable('source_jobs'))
    .then(() => knex.schema.dropTable('sources'))
    .then(() => knex.schema.dropTable('users'))
    .then(() => knex.schema.dropTable('tags'))
    .then(() => knex.schema.dropTable('media'))
