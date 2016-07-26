'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import UserList                        from './UserList'
import UserBadge                       from '../../users/containers/UserBadgeContainer'
import InternalError                   from '../../core/components/InternalError'


class Users extends Component {
    componentWillMount() {
        const { fetchUsersIfNeeded } = this.props
        fetchUsersIfNeeded()
    }

    render() {
        const { users, isFetching, status } = this.props

        if (status !== 0) {
            return <InternalError />
        }

        return (
            <div className="content">
                <div className="fixed-header content-header">
                    <h1>
                        <FormattedMessage id="users" />
                    </h1>
                    <UserBadge />
                </div>
                <div className="content-with-fixed-header">
                    <UserList loading={isFetching} users={users} />
                </div>
            </div>
        )
    }
}

Users.propTypes = {
    fetchUsersIfNeeded: PropTypes.func.isRequired,
    users:              PropTypes.array.isRequired,
    status:             PropTypes.number.isRequired,
    isFetching:         PropTypes.bool.isRequired,
}


export default Users
