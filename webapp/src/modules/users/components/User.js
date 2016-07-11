import React, { Component, PropTypes } from 'react'
import Loader                          from '../../core/components/Loader'
import UserNotFound                    from './UserNotFound'
import InternalError                   from '../../core/components/InternalError'
import { FETCH_STATUS_FAILURE }        from '../../core/constants/fetchStatuses'


class User extends Component {
    componentWillMount() {
        const { fetchUserIfNeeded } = this.props
        const { id }                = this.props.params
        fetchUserIfNeeded(id)
    }

    render() {
        const { userId, user, status, isFetching } = this.props

        if (status === 404) {
            return <UserNotFound id={userId} />
        } else if (status === FETCH_STATUS_FAILURE) {
            return <InternalError />
        }

        return (
            <div>
                <div className="content-header">
                    {!isFetching && (
                        <h1>
                            <img className="avatar avatar--small" src={user.gravatarUrl} /> {user.name}
                        </h1>
                    )}
                    <Loader loading={isFetching} />
                </div>
                <div className="content-wrapper">
                </div>
            </div>
        )
    }
}

User.propTypes = {
    fetchUserIfNeeded: PropTypes.func.isRequired,
    user:              PropTypes.object,
    status:            PropTypes.number.isRequired,
    isFetching:        PropTypes.bool.isRequired,
}


export default User
