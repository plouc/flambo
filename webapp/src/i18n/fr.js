export default {
    name: 'nom',
    description: 'description',
    country: 'pays',
    city: 'ville',
    create: 'créer',
    edit: 'éditer',
    cancel: 'annuler',
    submit: 'envoyer',
    created_at: 'créé',
    updated_at: 'modifié',
    settings: 'réglages',
    url: 'URL',
    picture: 'image',
    owner: 'propriétaire',
    form_cancel_message: 'The form has been modified, are you sure you want to leave this page?',

    // login
    login: 'identifiant',
    password: 'mot de passe',

    // errors
    page_not_found: 'Page non trouvée',
    internal_server_error: 'Erreur interne du serveur',
    validation_error: 'La validation a échouée',
    not_found_error: `No {entity} found for id: {id}.`,

    // Pager
    pager_page: 'page :',
    pager_per_page: 'par page:',
    pager_previous: 'page précédente',
    pager_next: 'page suivante',

    // File input
    file_select: 'sélectionner un fichier',
    file_select_picture: 'sélectionner une image',

    // Settings
    language: 'langue',
    lang_fr: 'français',
    lang_en: 'anglais',

    // Comments
    comments_none: 'aucun commentaire',
    comment_form_placeholder: 'votre commentaire…',

    // Users
    users: 'utilisateurs',
    first_name: 'prénom',
    last_name: 'nom',
    user: 'utilisateur',
    user_with_name: 'utilisateur : {user}',
    user_created_at: 'a rejoint',
    user_updated_at: 'modifié',
    user_groups: 'groupes :',
    user_feed: 'fil',
    user_comments: 'discussions',
    user_comments_none: `cet utilisateur n'a commenté aucun élément`,
    user_collections: 'collections',
    user_collections_public: 'partagées',
    user_collections_public_none: 'cet utilisateur ne partage aucune collection pour le moment',
    user_collections_subscriptions: 'abonnements',
    user_collections_subscriptions_none: `cet utilisateur ne s'est abonné à aucune collection pour le moment`,


    // Groups
    groups: 'groupes',
    group: 'groupe',
    group_create: 'créer un groupe',
    group_with_name: 'groupe : {group}',
    group_join: 'rejoindre',
    group_created_by: 'créé par {user}',
    group_members: 'membres',
    group_members_none: 'aucun abonné',
    group_member: 'membre',
    group_member_since: 'a rejoint le groupe {since}',
    group_members_count: `{count, plural,
        =0 {aucun membre pour le moment}
        one {{count} membre}
        other {{count} membres}
    }`,
    group_comments: 'discussions',
    group_comments_none: 'aucune discussion dans ce groupe pour le moment',
    group_feed: 'fil',
    group_feed_empty: 'aucun élément pour le moment',
    group_sources_none: 'aucune source définie pour ce groupe',

    // Sources
    sources: 'sources',
    source: 'source',
    source_with_name: 'source: {source}',
    source_create: 'créer une source',
    source_created_by: 'créée par {user}',
    source_type: 'type de source',
    source_select_type: 'Merci de sélectionner un type de source',
    source_feed: 'fil',
    source_jobs: 'tâches',
    // Meetup
    meetup_group_name: 'nom du groupe',
    meetup_group_url: 'url du groupe',
    meetup_group_urlname: 'urlname du groupe',

    // Collections
    collections: 'collections',
    collection: 'collection',
    collection_create: 'créer une collection',
    collection_with_name: 'collection : {collection}',
    collection_owned_by: 'collection de {owner}',
    collection_feed: 'fil',
    collection_comments: 'discussions',
    collection_created_by: 'une collection de {user}',
    collection_subscribers: 'abonnés',
    collection_subscribe: `s'abonner`,
    collection_subscribed_since: `s'est abonné {since}`,
    collection_subscribers_count: `{count, plural,
        =0 {aucun abonné pour le moment}
        one {{count} abonné}
        other {{count} abonnés}
    }`,

    // Feed
    feed_empty: 'aucun élément pour le moment',
    feed_item_collected_by_source: 'collecté via la source {type} {name} {date}',
}
