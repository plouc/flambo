import React, { Component, PropTypes } from 'react'
import UserListItem                    from './UserListItem'


const UserList = ({ users }) => (
    <ul className="list">
        {users.map(user => (
            <UserListItem key={user.id} user={user} />
        ))}
    </ul>
)

UserList.propTypes = {
    users: PropTypes.array.isRequired,
}


export default UserList
