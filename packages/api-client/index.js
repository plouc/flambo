const _       = require('lodash')
const request = require('request-promise-native')


const globalRequestOptions = () => {
    return {
        baseUrl: 'http://localhost:7000/api/v1',
        json:    true,
        headers: {
            Authorization: `Bearer ${process.env.FLAMBO_TOKEN}`,
        },
    }
}

exports.groups = {
    find: ({
        page    = 1,
        perPage = 10,
    } = {}) => request(_.defaultsDeep({
        uri: '/groups',
        qs:  {
            page:     page,
            per_page: perPage,
        },
    }, globalRequestOptions())),

    get: id => request(_.defaultsDeep({
        uri: `/groups/${id}`,
    }, globalRequestOptions())),

    feed: (id, {
        page    = 1,
        perPage = 10,
    } = {}) => request(_.defaultsDeep({
        uri: `/groups/${id}/feed`,
        qs:  {
            page:     page,
            per_page: perPage,
        },
    }, globalRequestOptions())),
}

exports.users = {
    find: ({
        page    = 1,
        perPage = 10,
    } = {}) => request(_.defaultsDeep({
        uri: '/users',
        qs:  {
            page:     page,
            per_page: perPage,
        },
    }, globalRequestOptions())),

    get: id => request(_.defaultsDeep({
        uri: `/users/${id}`,
    }, globalRequestOptions())),
}

exports.sources = {
    find: ({
        page    = 1,
        perPage = 10,
    } = {}) => request(_.defaultsDeep({
        uri: '/sources',
        qs:  {
            page:     page,
            per_page: perPage,
        },
    }, globalRequestOptions())),

    get: id => request(_.defaultsDeep({
        uri: `/sources/${id}`,
    }, globalRequestOptions())),

    feed: (id, {
        page    = 1,
        perPage = 10,
    } = {}) => request(_.defaultsDeep({
        uri: `/sources/${id}/feed`,
        qs:  {
            page:     page,
            per_page: perPage,
        },
    }, globalRequestOptions())),
}

exports.collections = {
    find: ({
        page    = 1,
        perPage = 10,
    } = {}) => request(_.defaultsDeep({
        uri: '/collections',
        qs:  {
            page:     page,
            per_page: perPage,
        },
    }, globalRequestOptions())),

    get: id => request(_.defaultsDeep({
        uri: `/collections/${id}`,
    }, globalRequestOptions())),

    feed: (id, {
        page    = 1,
        perPage = 10,
    } = {}) => request(_.defaultsDeep({
        uri: `/collections/${id}/feed`,
        qs:  {
            page:     page,
            per_page: perPage,
        },
    }, globalRequestOptions())),
}

