import React, { Component, PropTypes }         from 'react'
import { Link, hashHistory }                   from 'react-router'
import { FormattedMessage, FormattedRelative } from 'react-intl'


const stopPropagation = e => e.stopPropagation()
const clickHandler    = id => () => hashHistory.push(`/users/${id}`)


const UserListItem = ({ user }) => (
    <div className="list-item list-item--user" onClick={clickHandler(user.id)}>
        <span className="avatar avatar--list">
            <img src={user.gravatarUrl} />
        </span>
        <span className="item-title">{user.name}</span>
        <span className="item-date">
            <FormattedMessage
                id="user.created_at"
                values={{
                    createdAt: <FormattedRelative value={user.createdAt} updateInterval={60000} />,
                }}
            />
            &nbsp;|&nbsp;
            {user.lastLogin && (
                <FormattedMessage
                    id="user.last_login"
                    values={{
                        loginDate: <FormattedRelative value={user.lastLogin} updateInterval={60000} />,
                    }}
                />
            )}
        </span>
    </div>
)

UserListItem.propTypes = {
    user: PropTypes.shape({
        id:   PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
}


export default UserListItem
