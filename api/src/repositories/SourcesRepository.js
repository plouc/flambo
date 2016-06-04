const _ = require('lodash');

const TABLE_NAME = 'sources';

module.exports = container => {
    const r = container.get('rethinkdb');

    const findAll = () => {
        return r.table(TABLE_NAME).run();
    };

    const findAllWithThemes = () => {
        return r.table(TABLE_NAME)
            .outerJoin(r.table('themes'), (source, theme) => {
                return source('themes').default([]).contains(theme('id'));
            })
            .group(row => row('left')('id'))
            .ungroup()
            .map(group => {
                const source = group('reduction').nth(0)('left');
                return source.merge(r.branch(
                    source('themes').default([]).isEmpty(),
                    { themes: [] },
                    { themes: group('reduction').map(pair => pair('right')) }
                ))
            })
            .run()
        ;
    };

    const find = id => {
        return r.table(TABLE_NAME).get(id).run();
    };

    const findWithThemes = id => {
        return r.table('sources').get(id)
            .merge(source => {
                return {
                    themes: r.table('themes')
                        .filter(theme => source('themes').contains(theme('id')))
                        .coerceTo('array')
                };
            })
        ;
    };

    return {
        find,
        findWithThemes,
        findAll,
        findAllWithThemes,
    };
};