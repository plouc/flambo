import React, { PropTypes } from 'react'
import { Link }             from 'react-router-dom'
import styled               from 'styled-components'
import { FormattedMessage } from 'react-intl'
import CollectionsIcon      from 'react-icons/lib/md/folder-open'

import Loader               from '../../../core/components/Loader'


const Container = styled.div`
    padding:    0 24px 12px;
    font-size:  14px;
    min-height: 260px;
    position:   relative;
`

const ListItem = styled.div`
    display:     flex;
    height:      72px;
    padding:     12px 0;
    align-items: flex-start;
    border-top:  1px solid #f3f4f8;
    
    &:first-child {
        border-width: 0;
    }
`

const Name = styled.div`
    font-weight:   500;
    color:         black;
    margin-bottom: 3px;
`

const Avatar = styled.div`
    width:               48px;
    height:              48px;
    margin-right:        12px;
    background-size:     cover;
    background-color:    #fff;
    background-repeat:   no-repeat;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    border:              1px solid rgba(0, 0, 0, .1);
`

const Subscribers = styled.div`
    font-size: 13px;
    color:     #666;
`

const Empty = styled.div`
    display:        flex;
    flex-direction: column;
    align-items:    center;
    color:          #ddd;
    margin-top:     24px;
`

const EmptyMessage = styled.div`
    color:      #777;
    margin-top: 36px;
    font-size:  14px;
`

const UserCollections = ({
    hasBeenFetched,
    isFetching,
    collections,
    emptyMessageId,
}) => (
    <Container>
        {isFetching && <Loader/>}
        {hasBeenFetched && collections.length === 0 && (
            <Empty>
                <CollectionsIcon size={96}/>
                <EmptyMessage>
                    <FormattedMessage id={emptyMessageId}/>
                </EmptyMessage>
            </Empty>
        )}
        <div>
            {hasBeenFetched && collections.map(collection => (
                <ListItem key={collection.id}>
                    <Link to={`/collections/${collection.id}`}>
                        <Avatar url={collection.picture ? collection.picture.url : null}/>
                    </Link>
                    <div>
                        <Link to={`/collections/${collection.id}`}>
                            <Name>{collection.name}</Name>
                        </Link>
                        {collection.public && (
                            <Subscribers>
                                <FormattedMessage
                                    id="collection_subscribers_count"
                                    values={{ count: collection.subscribers_count }}
                                />
                            </Subscribers>
                        )}
                    </div>
                </ListItem>
            ))}
        </div>
    </Container>
)

UserCollections.propTypes = {
    hasBeenFetched: PropTypes.bool.isRequired,
    isFetching:     PropTypes.bool.isRequired,
    collections:    PropTypes.array.isRequired,
    emptyMessageId: PropTypes.string.isRequired,
}

export default UserCollections
