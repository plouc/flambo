'use strict'

import React, { PropTypes } from 'react'


const TopicSubscriptionButton = ({ topic, children, className = '', onSubscribe, onUnsubscribe }) => {
    const clickHandler = e => {
        e.stopPropagation()
        if (topic.subscribed) {
            onUnsubscribe()
        } else {
            onSubscribe()
        }
    }

    return (
        <span onClick={clickHandler} className={className}>
            {children}
        </span>
    )
}

TopicSubscriptionButton.propTypes = {
    topic:         PropTypes.object.isRequired,
    className:     PropTypes.string,
    onSubscribe:   PropTypes.func.isRequired,
    onUnsubscribe: PropTypes.func.isRequired,
}


export default TopicSubscriptionButton
