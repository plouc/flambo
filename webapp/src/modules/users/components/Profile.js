'use strict'

import React, { Component, PropTypes } from 'react'
import Loader                          from '../../core/components/Loader'
import UserBadgeContaier               from '../containers/UserBadgeContainer'


class Profile extends Component {
    render() {
        const { isFetching } = this.props

        return (
            <div className="content">
                <div className="fixed-header content-header">
                    <h1>Profile</h1>
                    <UserBadgeContaier />
                    <Loader loading={isFetching} />
                </div>
                <div className="content-with-fixed-header">
                    Profile
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
}


export default Profile
