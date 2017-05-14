import React, { PropTypes } from 'react'
import styled               from 'styled-components'
import { Link }             from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import SourcesIcon          from 'react-icons/lib/md/play-for-work'

import Loader               from '../../../core/components/Loader'
import typeImages           from '../../sources/components/typeImages'



const Container = styled.div`
    background-color: #fff;
    box-shadow:       0 1px 2px rgba(0, 0, 0, .07);
    padding-bottom:   6px;
    position:         relative;
`

const Title = styled.div`
    padding:        12px 12px 6px;
    font-weight:    500;
    text-transform: uppercase;
    font-size:      14px;
`

const Item = styled.div`
    font-size:   14px;
    padding:     6px 12px;
    display:     flex;
    align-items: center;
    
    &:hover {
        font-weight: 500;
        color:       #000;
    }
`

const Picture = styled.div`
    width:               24px;
    height:              24px;
    background:          black;
    margin-right:        12px;
    background-size:     contain;
    background-color:    #fff;
    background-repeat:   no-repeat;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
`

const Empty = styled.div`
    display:        flex;
    flex-direction: column;
    align-items:    center;
    color:          #ddd;
    margin:         24px;
`

const EmptyMessage = styled.div`
    color:      #777;
    margin-top: 24px;
    font-size:  12px;
    text-align: center;
`

const GroupSources = ({
    hasBeenFetched,
    isFetching,
    sources,
}) => {
    return (
        <Container>
            <Title>
                <FormattedMessage id="sources"/>
            </Title>
            {isFetching && <Loader/>}
            {hasBeenFetched && sources.length === 0 && (
                <Empty>
                    <SourcesIcon size={60}/>
                    <EmptyMessage>
                        <FormattedMessage id="group_sources_none"/>
                    </EmptyMessage>
                </Empty>
            )}
            {sources.map(source => (
                <Link key={source.id} to={`/sources/${source.id}`}>
                    <Item>
                        <Picture url={typeImages[source.type]}/>
                        {source.name}
                    </Item>
                </Link>
            ))}
        </Container>
    )
}

GroupSources.propTypes = {
    hasBeenFetched: PropTypes.bool.isRequired,
    isFetching:     PropTypes.bool.isRequired,
    sources:        PropTypes.array.isRequired,
}

export default GroupSources
