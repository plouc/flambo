'use strict'

import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import DropDown                        from '../../core/components/DropDown'
import AddToCollectionItem             from './AddToCollectionItem'
import Loader                          from '../../core/components/Loader'


class AddToCollection extends Component {
    componentWillMount() {
        const { fetchCollectionsIfNeeded } = this.props
        fetchCollectionsIfNeeded()
    }

    render() {
        const {
            collections,
            newsItem,
            isFetching,
            addNewsItemToCollection,
            removeNewsItemFromCollection
        } = this.props

        return (
            <DropDown
                buttonClassName="button button--action button--small"
                buttonContent="+"
                panelPosition="right"
            >
                <div className="add-to-collection__title">
                    <FormattedMessage id="collections" />
                </div>
                <Loader loading={isFetching} />
                {collections.map(collection => (
                    <AddToCollectionItem
                        key={collection.id}
                        collection={collection}
                        newsItem={newsItem}
                        onAdd={addNewsItemToCollection}
                        onRemove={removeNewsItemFromCollection}
                    />
                ))}
            </DropDown>
        )
    }
}

AddToCollection.propTypes = {
    fetchCollectionsIfNeeded:     PropTypes.func.isRequired,
    addNewsItemToCollection:      PropTypes.func.isRequired,
    removeNewsItemFromCollection: PropTypes.func.isRequired,
    collections:                  PropTypes.array.isRequired,
    isFetching:                   PropTypes.bool.isRequired,
    newsItem:                     PropTypes.object.isRequired,
}


export default AddToCollection
