import React, { Component, PropTypes } from 'react'
import NewsItemsListItem               from './NewsItemsListItem'


const NewsItemsList = ({ newsItems }) => (
    <ul className="list">
        {newsItems.map(newsItem => (
            <NewsItemsListItem key={newsItem.id} newsItem={newsItem} />
        ))}
    </ul>
)


export default NewsItemsList
