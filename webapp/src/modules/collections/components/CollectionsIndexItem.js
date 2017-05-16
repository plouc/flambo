import React, { PropTypes }   from 'react'
import { Link }               from 'react-router-dom'
import { FormattedMessage }   from 'react-intl'

import CollectionSubscription from '../containers/CollectionSubscriptionContainer'
import Placeholder            from '../../../core/components/Placeholder'
import {
    ItemContainer,
    Picture,
    Info,
    Title,
    Footer,
    Meta,
} from '../../../core/components/IndexGrid'


export const CollectionsIndexLoadingItem = () => (
    <ItemContainer>
        <Picture style={{ backgroundColor: '#eee' }}/>
        <Info>
            <div>
                <Placeholder
                    width="120px" height="20px"
                    style={{ marginBottom: '9px' }}
                />
                <Placeholder width="180px" height="14px"/>
            </div>
            <Footer>
                <Placeholder width="80px" height="28px"/>
            </Footer>
        </Info>
    </ItemContainer>
)

const CollectionsIndexItem = ({ url, collection }) => {
    return (
        <ItemContainer>
            <Link to={`${url}/${collection.id}`}>
                <Picture url={collection.picture_url}>
                    {!collection.picture_url && <span>{collection.name.charAt(0)}</span>}
                </Picture>
            </Link>
            <Info>
                <div>
                    <Link to={`${url}/${collection.id}`}>
                        <Title>{collection.name}</Title>
                    </Link>
                    <Meta>
                        <FormattedMessage
                            id="collection_subscribers_count"
                            values={{ count: collection.subscribers_count }}
                        />
                    </Meta>
                </div>
                <Footer>
                    <CollectionSubscription
                        collection={collection}
                        size="small"
                    />
                </Footer>
            </Info>
        </ItemContainer>
    )
}

CollectionsIndexItem.propTypes = {
    collection: PropTypes.object.isRequired,
    url:        PropTypes.string.isRequired,
}

export default CollectionsIndexItem
