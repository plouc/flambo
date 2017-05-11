import React, { Component, PropTypes } from 'react'
import classNames                      from 'classnames'


class AddToCollectionItem extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const { collection, newsItem, onAdd, onRemove } = this.props

        if (collection.news_items.includes(newsItem.id)) {
            onRemove(collection.id, newsItem.id)
        } else {
            onAdd(collection.id, newsItem.id)
        }
    }

    render() {
        const { collection, newsItem } = this.props

        const newsItemAlreadyAdded = collection.news_items.includes(newsItem.id)
        const iconClasses = classNames('icon', {
            //'icon--small':      true,
            'icon--push-right':  true,
            'icon--check-blue':  newsItemAlreadyAdded,
            'icon--circle-grey': !newsItemAlreadyAdded,
        })

        return (
            <div className="list-item nowrap compact" onClick={this.handleClick}>
                <span className={iconClasses} />
                {collection.name}
            </div>
        )
    }
}

AddToCollectionItem.propTypes = {
    onAdd:      PropTypes.func.isRequired,
    onRemove:   PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
    newsItem:   PropTypes.object.isRequired,
}


export default AddToCollectionItem
