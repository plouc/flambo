module.exports = container => {
    const r = container.get('rethinkdb');

    const findAll = () => {
        return r.table(TABLE_NAME).run();
    };

    const findAllWithTopics = () => {
        return r.table('sources')
            .outerJoin(r.table('topics'), (source, topic) => {
                return source('topics').default([]).contains(topic('id'));
            })
            .group(row => row('left')('id'))
            .ungroup()
            .map(group => {
                const source = group('reduction').nth(0)('left');

                return source.merge(r.branch(
                    source('topics').default([]).isEmpty(),
                    { topics: [] },
                    { topics: group('reduction').map(pair => pair('right')) }
                ))
            })
            .run()
        ;
    };

    const find = id => {
        return r.table('sources').get(id).run();
    };

    const findWithTopics = id => {
        return r.table('sources').get(id)
            .merge(source => {
                return {
                    topics: r.table('topics')
                        .filter(theme => source('topics').contains(theme('id')))
                        .coerceTo('array')
                };
            })
        ;
    };

    return {
        find,
        findWithTopics,
        findAll,
        findAllWithTopics,
    };
};