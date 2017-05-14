import React, { PropTypes }   from 'react'
import styled                 from 'styled-components'
import { Link }               from 'react-router-dom'
import { FormattedMessage }   from 'react-intl'

import { Cell }               from '../../../core/components/Grid'
import { Name }               from '../../../core/components/card'
import CollectionSubscription from '../containers/CollectionSubscriptionContainer'
import {
    Name as SkeletonName,
    Description as SkeletonDescription,
} from '../../../core/components/skeleton'


const Picture = styled.div`
    background-size:     contain;
    background-color:    #fff;
    background-repeat:   no-repeat;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    width:               160px;
    height:              160px;
    border:              12px solid white;
`

const Info = styled.div`
    display:         flex;
    flex-direction:  column;
    flex:            1;
    padding:         18px 24px;
    justify-content: space-between;
`

const Subscribers = styled.div`
    font-size: 13px;
    color:     #999;
`

const Footer = styled.div`
    display:         flex;
    justify-content: flex-end;
    font-size:       13px;
    color:           #999;
`

const cellStyle = {
    height:          160,
    backgroundColor: 'white',
    boxShadow:       '0 1px 2px rgba(0,0,0,0.07)',
    flexDirection:   'row',
}

export const CollectionsIndexItemSkeleton = () => (
    <Cell style={cellStyle}>
        <Picture style={{ backgroundColor: '#eee' }}/>
        <Info>
            <SkeletonName/>
            <SkeletonDescription/>
        </Info>
    </Cell>
)

const CollectionsIndexItem = ({ url, collection }) => {
    const { picture } = collection

    return (
        <Cell style={cellStyle}>
            <Link to={`${url}/${collection.id}`}>
                <Picture url={picture ? picture.url : null}/>
            </Link>
            <Info>
                <div>
                    <Link to={`${url}/${collection.id}`}>
                        <Name>{collection.name}</Name>
                    </Link>
                    <Subscribers>
                        <FormattedMessage
                            id="collection_subscribers_count"
                            values={{ count: collection.subscribers_count }}
                        />
                    </Subscribers>
                </div>
                <Footer>
                    <CollectionSubscription collection={collection} size="small"/>
                </Footer>
            </Info>
        </Cell>
    )
}

CollectionsIndexItem.propTypes = {
    collection: PropTypes.object.isRequired,
    url:        PropTypes.string.isRequired,
}

export default CollectionsIndexItem
