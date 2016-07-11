import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import TopicListItem                   from './TopicListItem'


const TopicList = ({ topics }) => (
    <ul className="grid">
        <Link to="/topics/new" className="grid-item">
            <span className="grid-item__banner">
                <span className="topic-picture">
                    <span className="topic-picture__default">+</span>
                </span>
            </span>
            <span className="grid-item__title">
                <FormattedMessage id="topic.create" />
            </span>
        </Link>
        {topics.map(topic => (
            <TopicListItem key={topic.id} topic={topic} />
        ))}
    </ul>
)

TopicList.propTypes = {
    topics: PropTypes.array.isRequired,
}


export default TopicList
