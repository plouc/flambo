const path    = require('path')
const uuid    = require('uuid')
const _       = require('lodash')
const faker   = require('faker')
const fs      = require('fs-extra')
const mime    = require('mime-types')
const yaml    = require('js-yaml')

const config  = require('../src/core/config')
const slugify = require('../src/core/slugify')

const getRelatedId = (name, collection, key) => {
    if (!collection[key]) {
        throw new Error(`no ${name} found for key: ${key}`)
    }

    return collection[key].id
}

const load = entity => yaml.safeLoad(fs.readFileSync(path.join(__dirname, `${entity}.yml`)))

const createMedium = filename => {
    const id       = uuid.v4()
    const filepath = `${id}${path.extname(filename)}`

    fs.copySync(
        path.join(__dirname, 'media', filename),
        path.join(__dirname, '..', 'static', filepath)
    )

    return {
        id,
        filename,
        mimetype: mime.lookup(filename),
        path:     filepath,
    }
}

const usersGroups            = []
const groupsSources          = []
const sourceJobs             = []
let   collectionsSubscribers = []

const media = _.mapValues(
    load('media'),
    medium => createMedium(medium)
)

const users = _.mapValues(
    load('users'),
    user => {
        return Object.assign(
            _.omit(user, 'avatar'),
            {
                id:        uuid.v4(),
                email:     `${_.deburr(_.lowerCase(user.first_name))}@flambo.io`,
                password:  _.deburr(_.lowerCase(user.first_name)),
                role:      user.role || 'user',
                avatar_id: user.avatar ? getRelatedId('avatar', media, user.avatar) : null,
            }
        )
    }
)

const sources = _.mapValues(
    load('sources'),
    source => {
        const id = uuid.v4()

        if (source.jobs) {
            source.jobs.forEach(job => {
                sourceJobs.push(Object.assign(job, {
                    id:        uuid.v4(),
                    source_id: id,
                }))
            })
        }

        return Object.assign(
            _.omit(source, 'owner', 'jobs'),
            {
                id,
                owner_id: getRelatedId('owner', users, source.owner),
                data:     JSON.stringify(source.data),
            }
        )
    }
)

const groups = _.mapValues(
    load('groups'),
    group => {
        const id = uuid.v4()
        if (group.members) {
            group.members.forEach(member => {
                usersGroups.push({
                    group_id:         id,
                    user_id:          getRelatedId('user', users, member.user),
                    is_administrator: !!member.is_administrator,
                })
            })
        }
        if (group.sources) {
            group.sources.forEach(source => {
                groupsSources.push({
                    group_id:  id,
                    source_id: getRelatedId('source', sources, source),
                })
            })
        }

        return Object.assign(
            _.omit(group, 'owner', 'picture', 'members', 'sources'),
            {
                id,
                slug:       slugify(group.name),
                owner_id:   users[group.owner].id,
                picture_id: group.picture ? getRelatedId('picture', media, group.picture) : null,
            }
        )
    }
)

const collections = _.mapValues(
    load('collections'),
    collection => {
        const id = uuid.v4()

        if (collection.subscribers) {
            collection.subscribers.forEach(subscription => {
                collectionsSubscribers.push({
                    collection_id:  id,
                    user_id:        getRelatedId('subscriber', users, subscription.user),
                    is_contributor: !!subscription.is_contributor,
                })
            })
        }

        return Object.assign(
            _.omit(collection, 'owner', 'picture', 'subscribers'),
            {
                id,
                owner_id:   getRelatedId('owner', users, collection.owner),
                picture_id: collection.picture ? getRelatedId('picture', media, collection.picture) : null,
                selection:  {
                    ids: [],
                },
            }
        )
    }
)

const comments = load('comments')
    .map(comment => Object.assign(
        _.omit(comment, 'author', 'group', 'collection'),
        {
            id:            uuid.v4(),
            author_id:     users[comment.author].id,
            group_id:      comment.group ? getRelatedId('group', groups, comment.group) : null,
            collection_id: comment.collection ? getRelatedId('collection', collections, comment.collection) : null,
        }
    ))

exports.seed = knex => {
    return Promise.resolve()

        // cleanup
        .then(() => knex('users_groups').del())
        .then(() => knex('comments').del())
        .then(() => knex('groups_sources').del())
        .then(() => knex('groups').del())
        .then(() => knex('collections_subscribers').del())
        .then(() => knex('collections').del())
        .then(() => knex('source_jobs').del())
        .then(() => knex('sources').del())
        .then(() => knex('users').del())
        .then(() => knex('media').del())
        .then(() => knex('tags').del())

        // load
        .then(() => knex('media').insert(_.values(media)))
        .then(() => knex('users').insert(_.values(users)))
        .then(() => knex('groups').insert(_.values(groups)))
        .then(() => knex('users_groups').insert(usersGroups))
        .then(() => knex('sources').insert(_.values(sources)))
        .then(() => knex('source_jobs').insert(sourceJobs))
        .then(() => knex('groups_sources').insert(groupsSources))
        .then(() => knex('collections').insert(_.values(collections)))
        .then(() => knex('collections_subscribers').insert(collectionsSubscribers))
        .then(() => knex('comments').insert(comments))
}
