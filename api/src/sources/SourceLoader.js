const sourceLoaders = {};

module.exports.register = (id, source) => {
    sourceLoaders[id] = source;
};

module.exports.load = (sourceType, config) => {
    const sourceLoader = sourceLoaders[sourceType];

    return sourceLoader.load(config);
};

module.exports.batchLoad = sources => {
    return Promise.all(sources.map(source => {
        return module.exports.load(source.type, source.data)
            .then(results => {
                return results.map(result => {
                    result.sourceId   = source.id;
                    result.sourceType = source.type;

                    return result;
                })
            })
        ;
    }))
        .then(results => [].concat.apply([], results))
    ;
};