import React from 'react';


const sourceTitle = source => {
    switch (source.type) {
        case 'twitter':
            return (
                <span>{source.type} @{source.data.user}</span>
            );
            break;

        case 'rss':
            return (
                <span>RSS {source.data.url}</span>
            );
            break;
    }

    return 'unknown';
};


export default sourceTitle;
