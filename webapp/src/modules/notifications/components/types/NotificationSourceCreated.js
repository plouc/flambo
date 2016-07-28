'use strict'

import React, { PropTypes }                 from 'react'
import { Link }                             from 'react-router'
import { FormattedMessage }                 from 'react-intl'
import { NOTIFICATION_TYPE_SOURCE_CREATED } from '../../constants/notificationTypes'


const NotificationSourceCreated = ({ id, name }) => (
    <FormattedMessage
        id={NOTIFICATION_TYPE_SOURCE_CREATED}
        values={{
            name: <Link to={`/sources/${id}`}>{name}</Link>
        }}
    />
)

NotificationSourceCreated.propTypes = {
    id:   PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}


export default NotificationSourceCreated
