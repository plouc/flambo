import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'


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
                        className="menu-item"
                        activeClassName="menu-item--active"
                    >
                        {collection.name}
                    </Link>
                ))
            )
        } else {
            menuItems = <li className="menu-item">An error occurred.</li>
        }

        return (
            <nav className="menu">
                <h3 className="menu-title">
                    <FormattedMessage id="collections" />
                </h3>
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
