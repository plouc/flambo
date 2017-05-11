/**
 * @module notifications/actions/NotificationsActions
 */
'use strict'

import uuid from 'node-uuid'


export const NOTIFY              = 'NOTIFY'
export const NOTIFICATION_DELETE = 'NOTIFICATION_DELETE'


export const notify = (notificationType, meta = {}) => {
    return {
        id:   uuid.v4(),
        type: NOTIFY,
        notificationType,
        meta,
    }
}

export const deleteNotification = id => {
    return dispatch => {
        dispatch({
            type: NOTIFICATION_DELETE,
            id,
        })
    }
}
