'use strict'


import NotificationTopicCreated from './NotificationTopicCreated'
import {
    NOTIFICATION_TYPE_TOPIC_CREATED,
} from '../../constants/notificationTypes'


const notificationComponentByType = {
    [NOTIFICATION_TYPE_TOPIC_CREATED]: NotificationTopicCreated,
}


export default notificationComponentByType