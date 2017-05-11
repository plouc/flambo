'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import Loader                          from '../../core/components/Loader'


class CollectionsMenu extends Component {
    componentWillMount() {
        const { fetchCollectionsIfNeeded } = this.props
        fetchCollectionsIfNeeded()
    }

    render() {
        const { collections, isFetching, status } = this.props

        let menuItems
        if (status === 0) {
            menuItems = (
                collections.map(collection => (
                    <Link
                        key={collection.id}
                        to={`/collections/${collection.id}`}
                        className="f-menu__item"
                        activeClassName="_active"
                    >
                        {collection.name}
                    </Link>
                ))
            )
        } else {
            menuItems = <li className="f-menu__item">An error occurred.</li>
        }

        return (
            <nav className="f-menu">
                <h3 className="f-menu__title">
                    <FormattedMessage id="collections" />
                </h3>
                <Loader loading={isFetching} />
                {menuItems}
            </nav>
        )
    }
}

CollectionsMenu.propTypes = {
    fetchCollectionsIfNeeded: PropTypes.func.isRequired,
    collections:              PropTypes.array.isRequired,
    isFetching:               PropTypes.bool.isRequired,
    status:                   PropTypes.number.isRequired,
}


export default CollectionsMenu
