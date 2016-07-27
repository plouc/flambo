import React, { Component, PropTypes }         from 'react'
import { Link, hashHistory }                   from 'react-router'
import { FormattedMessage, FormattedRelative } from 'react-intl'
import TopicPicture                            from './TopicPicture'
import TopicSubscriptionButton                 from '../containers/TopicSubscriptionButtonContainer'


const clickHandler = id => () => hashHistory.push(`/topics/${id}`)


const TopicListItem = ({ topic, onSubscribe }) => (
    <div className="grid-item" onClick={clickHandler(topic.id)}>
        <div className="grid-item__banner">
            <TopicPicture topic={topic} />
        </div>
        <span className="grid-item__title">{topic.name}</span>
        <TopicSubscriptionButton topic={topic} />
    </div>
)

TopicListItem.propTypes = {
    topic: PropTypes.shape({
        id:   PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
}


export default TopicListItem
