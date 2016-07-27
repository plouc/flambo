'use strict'

import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import classNames           from 'classnames'


const TopicSubscriptionButton = ({ topic, className = '', onSubscribe, onUnsubscribe }) => {
    const clickHandler = e => {
        e.stopPropagation()
        if (topic.subscribed) {
            onUnsubscribe()
        } else {
            onSubscribe()
        }
    }

    return (
        <span
            className={classNames('button', className)}
            onClick={clickHandler}
        >
            <FormattedMessage
                id={`topic.${topic.subscribed ? 'unsubscribe' : 'subscribe'}`}
            />
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
