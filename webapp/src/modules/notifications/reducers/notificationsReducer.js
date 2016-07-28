/**
 * @module notifications/reducers/NotificationsReducer
 */
'use strict'

import _ from 'lodash'
import {
    NOTIFY,
    NOTIFICATION_DELETE,
} from '../actions/notificationsActions'



/**
 * Global reducer for notifications.
 *
 * @param {Object} state  - The current state
 * @param {Object} action - The current action
 * @returns {Object} The updated state or current if no action match
 */
export default function notifications(state = {
    items: [],
}, action) {
    switch (action.type) {
        case NOTIFY:
            return {
                items: [
                    { ..._.pick(action, ['id', 'notificationType', 'meta']) },
                    ...state.items,
                ]
            }

        case NOTIFICATION_DELETE:
            return {
                items: state.items.filter(notification => notification.id !== action.id),
            }

        default:
            return state
    }
}
