import React, { PropTypes }  from 'react'
import styled                from 'styled-components'
import { Link }              from 'react-router-dom'
import ExternalLinkIcon      from 'react-icons/lib/fa/external-link'
import FeedIcon              from 'react-icons/lib/go/radio-tower'
import {
    FormattedMessage,
    FormattedDate,
    FormattedRelative,
} from 'react-intl'

import Loader                from '../../../core/components/Loader'


const Container = styled.div`
    background: white;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07);
    padding:    12px 24px;
    font-size:  14px;
    position:   relative;
    min-height: 260px;
`

const ListItem = styled.div`
    padding:    12px 0;
    border-top: 1px solid #f3f4f8;
    position:   relative;
    
    &:first-child {
        border-width: 0;
    }
`

const Title = styled.div`
    font-weight:   500;
    color:         black;
`

const Bold = styled.span`
    font-weight:   500;
    color:         #333;
`

const Meta = styled.div`
    font-size: 13px;
    color:     #777;
`

const ExternalLink = styled.a`
    color:     ${props => props.theme.primaryTextColor};
    position:  absolute;
    top:       12px;
    right:     0;
    font-size: 16px;
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

const FeedList = ({
    hasBeenFetched,
    isFetching,
    items,
    emptyMessageId,
}) => (
    <Container>
        {isFetching && <Loader/>}
        {hasBeenFetched && items.length === 0 && (
            <Empty>
                <FeedIcon size={96}/>
                <EmptyMessage>
                    <FormattedMessage id={emptyMessageId}/>
                </EmptyMessage>
            </Empty>
        )}
        <div>
            {items.map(item => (
                <ListItem key={item.id}>
                    <Title>{item.title}</Title>
                    <FormattedDate
                        value={item.published_at}
                        year='numeric'
                        month='long'
                        day='2-digit'
                    />
                    <ExternalLink href={item.link} target="_blank">
                        <ExternalLinkIcon/>
                    </ExternalLink>
                    <Meta>
                        <FormattedMessage
                            id="feed_item_collected_by_source"
                            values={{
                                type: item.source_type,
                                name: (
                                    <Link to={`/sources/${item.source_id}`}>
                                        <Bold>{item.source_name}</Bold>
                                    </Link>
                                ),
                                date: (
                                    <FormattedRelative
                                        value={item.published_at}
                                    />
                                ),
                            }}
                        />
                    </Meta>
                    {/*<div>{item.content}</div>*/}
                </ListItem>
            ))}
        </div>
    </Container>
)

FeedList.propTypes = {
    hasBeenFetched: PropTypes.bool.isRequired,
    isFetching:     PropTypes.bool.isRequired,
    items:          PropTypes.array.isRequired,
    emptyMessageId: PropTypes.string.isRequired,
}

FeedList.defaultProps = {
    emptyMessageId: 'feed_empty',
}

export default FeedList
