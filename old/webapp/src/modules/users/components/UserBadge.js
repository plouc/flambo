'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import DropDown                        from '../../core/components/DropDown'


class UserBadge extends Component {
    componentWillMount() {
        const { fetchProfileIfNeeded } = this.props
        fetchProfileIfNeeded()
    }

    render() {
        const { me, isFetching, onLogout } = this.props

        let avatar = ''
        let header = null

        if (!isFetching) {
            avatar = (
                <img className="avatar avatar--small" src={me.gravatarUrl}/>
            )

            header = (
                <div className="user-menu__name">{me.name}</div>
            )
        }

        return (
            <DropDown
                buttonClassName="button button--naked"
                buttonContent={avatar}
                panelPosition="right"
                panelClassName="dropdown__panel user-menu"
            >
                {header}
                <div className="user-menu__item" onClick={onLogout}>
                    <span className="icon icon--push-right icon--exit-blue" />
                    <FormattedMessage id="logout"/>
                </div>
                <Link to="/profile" className="user-menu__item">
                    <span className="icon icon--push-right icon--user-cog-blue" />
                    <FormattedMessage id="user.profile.settings" />
                </Link>
            </DropDown>
        )
    }
}

UserBadge.propTypes = {
    fetchProfileIfNeeded: PropTypes.func.isRequired,
    isFetching:           PropTypes.bool.isRequired,
    me:                   PropTypes.object,
    onLogout:             PropTypes.func.isRequired,
}


export default UserBadge
