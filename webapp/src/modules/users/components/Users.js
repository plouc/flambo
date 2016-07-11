import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import UserList                        from './UserList'
import Loader                          from '../../core/components/Loader'
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
            <div>
                <div className="content-header">
                    <h1>
                        <FormattedMessage id="users" />
                    </h1>
                    <Loader loading={isFetching} />
                </div>
                <div className="content-wrapper">
                    <UserList users={users} />
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
