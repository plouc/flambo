import React from 'react'


const sourceTitle = source => {
    switch (source.type) {
        case 'twitter':
            return (
                <span>{source.type} user: @{source.data.user}</span>
            )
            break

        case 'rss':
            return (
                <span>RSS url: {source.data.url}</span>
            )
            break
    }

    return 'unknown'
}


export default sourceTitle
