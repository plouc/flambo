import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import AddToCollectionItem             from './AddToCollectionItem'


class AddToCollection extends Component {
    componentWillMount() {
        const { fetchCollectionsIfNeeded } = this.props
        fetchCollectionsIfNeeded()
    }

    render() {
        const {
            collections,
            newsItem,
            addNewsItemToCollection,
            removeNewsItemFromCollection
        } = this.props

        return (
            <div className="add-to-collection">
                <span className="button button--small button--action">
                    +
                </span>
                <ul className="add-to-collection__content">
                    <li className="add-to-collection__title">
                        <FormattedMessage id="collections" />
                    </li>
                    {collections.map(collection => (
                        <AddToCollectionItem
                            key={collection.id}
                            collection={collection}
                            newsItem={newsItem}
                            onAdd={addNewsItemToCollection}
                            onRemove={removeNewsItemFromCollection}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

AddToCollection.propTypes = {
    fetchCollectionsIfNeeded:     PropTypes.func.isRequired,
    addNewsItemToCollection:      PropTypes.func.isRequired,
    removeNewsItemFromCollection: PropTypes.func.isRequired,
    collections:                  PropTypes.array.isRequired,
    newsItem:                     PropTypes.object.isRequired,
}


export default AddToCollection
