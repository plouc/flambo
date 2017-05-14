exports.item = {
    properties: {
        id: {
            type:  'keyword',
        },
        source_id: {
            type:  'keyword',
        },
        source_type: {
            type:  'keyword',
        },
        external_id: {
            type:  'keyword',
        },
        image: {
            type:  'keyword',
        },
        created_at: {
            type:   'date',
            format: 'date_optional_time',
        },
    },
}
