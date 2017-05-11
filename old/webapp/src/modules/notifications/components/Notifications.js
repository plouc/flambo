'use strict'

import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import ReactCSSTransitionGroup         from 'react-addons-css-transition-group'
import componentByType                 from './types'


class Notifications extends Component {
    render() {
        const { notifications, deleteNotification } = this.props

        return (
            <div className="notifications">
                <ReactCSSTransitionGroup
                    transitionName="notifications__item"
                    transitionEnterTimeout={400}
                    transitionLeaveTimeout={400}
                >
                    {notifications.map(notification => (
                        <div key={notification.id} className="notifications__item">
                            {componentByType[notification.notificationType] ? (
                                React.createElement(componentByType[notification.notificationType], notification.meta)
                            ) : (
                                <FormattedMessage id={notification.notificationType} values={notification.meta} />
                            )}
                            <span
                                className="notifications__item__delete"
                                onClick={() => { deleteNotification(notification.id) }}
                            >
                                x
                            </span>
                        </div>
                    ))}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

Notifications.propTypes = {
    notifications:      PropTypes.array.isRequired,
    deleteNotification: PropTypes.func.isRequired,
}


export default Notifications
