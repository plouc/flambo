'use strict'

import NotificationTopicCreated  from './NotificationTopicCreated'
import NotificationSourceCreated from './NotificationSourceCreated'
import {
    NOTIFICATION_TYPE_TOPIC_CREATED,
    NOTIFICATION_TYPE_SOURCE_CREATED,
} from '../../constants/notificationTypes'


const notificationComponentByType = {
    [NOTIFICATION_TYPE_TOPIC_CREATED]:  NotificationTopicCreated,
    [NOTIFICATION_TYPE_SOURCE_CREATED]: NotificationSourceCreated,
}


export default notificationComponentByType