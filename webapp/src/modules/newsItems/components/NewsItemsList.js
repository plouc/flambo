'use strict'

import React, { PropTypes } from 'react'
import NewsItemsListItem    from './NewsItemsListItem'
import ContentLoading       from '../../core/components/ContentLoading'


const NewsItemsList = ({ loading, newsItems }) => {
    const hasNewsItem = newsItems.length > 0

    let content
    if (!loading && !hasNewsItem) {
        content = <div>No news items.</div>
    } else {
        content = (
            <div className="list">
                {newsItems.map(newsItem => (
                    <NewsItemsListItem key={newsItem.id} newsItem={newsItem}/>
                ))}
            </div>
        )
    }

    return (
        <ContentLoading loading={loading} hasItem={hasNewsItem}>
            {content}
        </ContentLoading>
    )
}

NewsItemsList.propTypes = {
    loading:   PropTypes.bool.isRequired,
    newsItems: PropTypes.array.isRequired,
}


export default NewsItemsList
