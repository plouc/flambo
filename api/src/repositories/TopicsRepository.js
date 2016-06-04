module.exports = container => {
    const r = container.get('rethinkdb');

    const findAll = () => {
        return r.table('topics').run();
    };

    const find = id => {
        return r.table('topics').get(id).run();
    };

    const findWithSources = id => {
        return r.table('topics').get(id)
            .merge(() => {
                return {
                    sources: r.table('sources').filter(source => {
                        return source('topics').contains(id);
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