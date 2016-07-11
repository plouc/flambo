import React, { Component, PropTypes } from 'react'
import { FormattedRelative }           from 'react-intl'
import renderTweet                     from './renderer/renderTweet'
import AddToCollection                 from '../../collections/containers/AddToCollection'


const renderContent = (newsItem) => {
    switch (newsItem.sourceType) {
        case 'twitter':
            const { parts, photos } = renderTweet(newsItem)
            let photoNode = null
            if (photos.length > 0) {
                photoNode = (
                    <div>
                        {photos}
                    </div>
                )
            }

            return (
                <div>
                    <span className="item-title">
                        {parts}
                    </span>
                    {photoNode}
                </div>
            )

        default:
            return newsItem.content
    }
}


class NewsItemsListItem extends Component {
    render() {
        const { newsItem } = this.props

        return (
            <li className="list-item">
                {renderContent(newsItem)}
                <span>{newsItem.sourceType}</span><br/>
                <FormattedRelative value={newsItem.createdAt} />
                <div className="list-item__controls">
                    <AddToCollection newsItem={newsItem} />
                </div>
            </li>
        )
    }
}


export default NewsItemsListItem
