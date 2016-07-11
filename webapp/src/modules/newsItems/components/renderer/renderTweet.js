'use strict'

import React from 'react'


export default function transformTweet(tweet) {
    const { content, meta } = tweet
    const {
        hashtags      = [],
        urls          = [],
        user_mentions = [],
        media         = [],
    } = meta.entities

    let entities = [
        ...hashtags.map(hashtag => {
            hashtag.type = 'hashtag'
            return hashtag
        }),
        ...urls.map(url => {
            url.type = 'url'
            return url
        }),
        ...user_mentions.map(userMention => {
            userMention.type = 'user_mention'
            return userMention
        }),
        ...media,
    ]

    entities = _.orderBy(entities, entity => entity.indices[0])

    const parts  = []
    const photos = []

    let lastIndice = 0

    entities.forEach(entity => {
        const { indices: [ start, end ] } = entity
        let part = content.slice(start, end)

        if (lastIndice < start) {
            parts.push(content.slice(lastIndice, start))
        }

        switch (entity.type) {
            case 'hashtag':
                part = (
                    <a
                        key={`hashtag.${entity.text}`}
                        href={`https://twitter.com/hashtag/${entity.text}?src=hash`}
                        target="_blank"
                    >
                        {part}
                    </a>
                )
                break

            case 'url':
                part = (
                    <a
                        key={entity.url}
                        href={entity.expanded_url}
                        target="_blank"
                    >
                        {part}
                    </a>
                )
                break

            case 'user_mention':
                part = (
                    <a
                        key={`user.${entity.screen_name}`}
                        href={`https://twitter.com/${entity.screen_name}`}
                    >
                        {part}
                    </a>
                )
                break

            case 'photo':
                photos.push(<img src={`${entity.media_url}:thumb`} />)
                part = ''
        }

        parts.push(part)

        lastIndice = end
    })

    if (lastIndice < content.length) {
        parts.push(content.slice(lastIndice, content.length))
    }

    return {
        parts,
        photos,
    }
}
