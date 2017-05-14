export default {
    name: 'name',
    description: 'description',
    country: 'country',
    city: 'city',
    create: 'create',
    edit: 'エディット',
    cancel: 'キャンセル',
    submit: '提出する',
    created_at: 'created',
    updated_at: 'updated',
    settings: '設定',
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
    lang_ja: '日本語',

    // Users
    users: 'ユーザーズ',
    first_name: 'first name',
    last_name: 'last name',
    user: 'ユーザー',
    user_with_name: 'ユーザー: {user}',
    user_created_at: 'joined',
    user_updated_at: 'updated',
    user_groups: 'グループ:',
    user_feed: 'feed',
    user_comments: '議論',
    user_collections: '収集',

    // Groups
    groups: 'グループ',
    group: 'グループ',
    group_create: 'create group',
    group_with_name: 'group: {group}',
    group_join: '申し込む',
    group_created_by: '{user} によって作成されました',
    group_members: 'メンバー',
    group_member: 'メンバー',
    group_member_since: 'joined {since}',
    group_members_count: `{count, plural,
        =0 {no members yet}
        one {{count} 人のメンバー}
        other {{count} 人のメンバー}
    }`,
    group_comments: '議論',
    group_feed: 'feed',

    // Sources
    sources: 'ソース',
    source: 'ソース',
    source_with_name: 'source: {source}',
    source_create: 'create source',
    source_created_by: '{user} によって作成されました',
    source_type: 'source type',
    source_select_type: 'Please select a source type',
    source_feed: 'feed',
    source_jobs: 'jobs',
    // Meetup
    meetup_group_name: 'group name',
    meetup_group_url: 'group url',
    meetup_group_urlname: 'group urlname',

    // Collections
    collections: '収集',
    collection: '収集',
    collection_create: 'create collection',
    collection_with_name: 'collection: {collection}',
    collection_owned_by: 'owned by {owner}',
    collection_feed: 'feed',
    collection_comments: '議論',
    collection_created_by: 'a collection by {user}',
    collection_subscribers: 'subscribers',
    collection_subscribed_since: 'subscribed {since}',
    collection_subscribers_count: `{count, plural,
        =0 {no subscriber yet}
        one {{count} subscriber}
        other {{count} subscribers}
    }`,
}