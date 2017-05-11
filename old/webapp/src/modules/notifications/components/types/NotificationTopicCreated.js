'use strict'

import React, { PropTypes }                from 'react'
import { Link }                            from 'react-router'
import { FormattedMessage }                from 'react-intl'
import { NOTIFICATION_TYPE_TOPIC_CREATED } from '../../constants/notificationTypes'


const NotificationTopicCreated = ({ id, name }) => (
    <FormattedMessage
        id={NOTIFICATION_TYPE_TOPIC_CREATED}
        values={{
            name: <Link to={`/topics/${id}`}>{name}</Link>
        }}
    />
)

NotificationTopicCreated.propTypes = {
    id:   PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}


export default NotificationTopicCreated
