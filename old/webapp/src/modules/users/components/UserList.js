'use strict'

import React, { PropTypes } from 'react'
import UserListItem         from './UserListItem'
import ContentLoading       from '../../core/components/ContentLoading'


const UserList = ({ loading, users }) => (
    <ContentLoading loading={loading} hasItem={users.length > 0}>
        <div className="list">
            {users.map(user => (
                <UserListItem key={user.id} user={user} />
            ))}
        </div>
    </ContentLoading>
)

UserList.propTypes = {
    loading: PropTypes.bool.isRequired,
    users:   PropTypes.array.isRequired,
}


export default UserList
