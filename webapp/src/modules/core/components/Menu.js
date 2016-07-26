import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'


/**
 * @namespace components/Menu
 */
const Menu = () => (
    <div role="nav" className="f-menu">
        <Link
            to="/news_items"
            className="f-menu__item"
            activeClassName="_active"
        >
            <span className="icon icon--news-feed icon--push-right" />
            <FormattedMessage id="news_items"/>
        </Link>
        <Link
            to="/topics"
            className="f-menu__item"
            activeClassName="_active"
        >
            <span className="icon icon--hashtag icon--push-right" />
            <FormattedMessage id="topics"/>
        </Link>
        <Link
            to="/sources"
            className="f-menu__item"
            activeClassName="_active"
        >
            <span className="icon icon--magnet icon--push-right" />
            <FormattedMessage id="sources"/>
        </Link>
        <Link
            to="/users"
            className="f-menu__item"
            activeClassName="_active"
        >
            <span className="icon icon--users icon--push-right" />
            <FormattedMessage id="users"/>
        </Link>
    </div>
)


export default Menu
