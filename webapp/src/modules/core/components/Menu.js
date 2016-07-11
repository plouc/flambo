import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'


/**
 * @namespace components/Menu
 */
const Menu = () => (
    <div role="nav" className="menu">
        <Link
            to="/topics"
            className="menu-item"
            activeClassName="menu-item--active"
        >
            <FormattedMessage id="topics"/>
        </Link>
        <Link
            to="/sources"
            className="menu-item"
            activeClassName="menu-item--active"
        >
            <FormattedMessage id="sources"/>
        </Link>
        <Link
            to="/news_items"
            className="menu-item"
            activeClassName="menu-item--active"
        >
            <FormattedMessage id="news_items"/>
        </Link>
        <Link
            to="/users"
            className="menu-item"
            activeClassName="menu-item--active"
        >
            <FormattedMessage id="users"/>
        </Link>
    </div>
)


export default Menu
