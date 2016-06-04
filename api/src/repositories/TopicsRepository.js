const _ = require('lodash');

const TABLE_NAME = 'themes';

module.exports = container => {
    const r = container.get('rethinkdb');

    const findAll = () => {
        return r.table(TABLE_NAME).run();
    };

    const find = id => {
        return r.table(TABLE_NAME).get(id).run();
    };

    const findWithSources = id => {
        return r.table(TABLE_NAME).get(id)
            .merge(() => {
                return {
                    sources: r.table('sources').filter(source => {
                        return source('themes').contains(id);
                    }).coerceTo('array')
                };
            })
            .run()
        ;
    };

    return {
        findAll,
        find,
        findWithSources,
    };
};