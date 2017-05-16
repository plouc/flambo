export default {
    name: 'name',
    description: 'description',
    country: 'country',
    city: 'city',
    create: 'create',
    edit: 'edit',
    cancel: 'cancel',
    submit: 'submit',
    created_at: 'created',
    updated_at: 'updated',
    settings: 'settings',
    about: 'about',
    url: 'URL',
    picture: 'picture',
    owner: 'owner',
    form_cancel_message: 'The form has been modified, are you sure you want to leave this page?',

    // login
    login: 'login',
    password: 'password',

    // errors
    page_not_found: 'Page not found',
    internal_server_error: 'Internal server error',
    validation_error: 'Validation failed',
    not_found_error: `No {entity} found for id: {id}.`,

    // Pager
    pager_page: 'page:',
    pager_per_page: 'per page:',
    pager_previous: 'previous page',
    pager_next: 'next page',

    // File input
    file_select: 'select a file',
    file_select_picture: 'select a picture',

    // Settings
    language: 'language',
    lang_fr: 'french',
    lang_en: 'english',

    // Comments
    comments_none: 'no comment',
    comment_form_placeholder: 'your comment…',

    // Users
    users: 'users',
    first_name: 'first name',
    last_name: 'last name',
    user: 'user',
    user_with_name: 'user: {user}',
    user_created_at: 'joined',
    user_updated_at: 'updated',
    user_groups: 'groups:',
    user_groups_none: 'this user is not member of any group yet',
    user_feed: 'feed',
    user_feed_empty: 'this user feed does not have any item yet',
    user_comments: 'discussions',
    user_comments_none: 'this user has not commented anything yet',
    user_collections: 'collections',
    user_collections_public: 'shared',
    user_collections_public_none: 'this user has not shared any collection yet',
    user_collections_subscriptions: 'subscriptions',
    user_collections_subscriptions_none: 'this user has not subscribed to any collection yet',

    // Groups
    groups: 'groups',
    groups_load_more: 'discover more groups',
    group: 'group',
    group_create: 'create group',
    group_with_name: 'group: {group}',
    group_join: 'join',
    group_created_by: 'created by {user}',
    group_members: 'members',
    group_members_none: 'this group does not have any member yet',
    group_member_since: 'joined {since}',
    group_members_count: `{count, plural,
        =0 {no members yet}
        one {{count} member}
        other {{count} members}
    }`,
    group_owner: `it's yours`,
    group_member: 'member',
    group_administrator: 'admin',
    group_comments: 'discussions',
    group_comments_none: 'this group does not have any comment yet',
    group_feed: 'feed',
    group_feed_empty: 'this group does not have any item yet',
    group_sources_none: 'this group does not have any source yet',

    // Sources
    sources: 'sources',
    sources_load_more: 'load more sources',
    source: 'source',
    source_with_name: 'source: {source}',
    source_create: 'create source',
    source_created_by: 'created by {user}',
    source_type: 'source type',
    source_select_type: 'Please select a source type',
    source_feed: 'feed',
    source_feed_empty: 'this source does not have any item yet',
    source_jobs: 'jobs',
    // Meetup
    meetup_group_name: 'group name',
    meetup_group_url: 'group url',
    meetup_group_urlname: 'group urlname',

    // Collections
    collections: 'collections',
    collections_load_more: 'discover more collections',
    collection: 'collection',
    collection_create: 'create collection',
    collection_with_name: 'collection: {collection}',
    collection_owned_by: 'owned by {owner}',
    collection_private: 'private',
    collection_feed: 'feed',
    collection_feed_empty: 'this collection does not have any item yet',
    collection_comments: 'discussions',
    collection_comments_none: 'this collection does not have any comment yet',
    collection_created_by: 'a collection by {user}',
    collection_subscribers: 'subscribers',
    collection_subscribe: 'subscribe',
    collection_subscribers_none: 'this collection does not have any subscriber yet',
    collection_subscribed_since: 'subscribed {since}',
    collection_subscribers_count: `{count, plural,
        =0 {no subscriber yet}
        one {{count} subscriber}
        other {{count} subscribers}
    }`,
    collection_subscriber: 'subscriber',
    collection_contributor: 'contributor',
    collection_owner: `it's yours`,

    // Feed
    feed_empty: 'this feed does not contain any item yet',
    feed_item_collected_by_source: 'collected through {type} source {name} {date}',
}