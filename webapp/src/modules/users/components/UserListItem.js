import React, { Component, PropTypes }         from 'react'
import { Link, hashHistory }                   from 'react-router'
import { FormattedMessage, FormattedRelative } from 'react-intl'


const stopPropagation = e => e.stopPropagation()
const clickHandler    = id => () => hashHistory.push(`/users/${id}`)


const UserListItem = ({ user }) => (
    <li className="list-item list-item--user" onClick={clickHandler(user.id)}>
        <span className="avatar avatar--list">
            <img src={user.gravatarUrl} />
        </span>
        <span className="item-title">{user.name}</span>
        <span className="item-date">
            <FormattedRelative value={user.createdAt} updateInterval={60000} />
        </span>
    </li>
)

UserListItem.propTypes = {
    user: PropTypes.shape({
        id:   PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
}


export default UserListItem
