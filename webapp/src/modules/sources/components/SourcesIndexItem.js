import React, { PropTypes } from 'react'
import { Link }             from 'react-router-dom'
import styled               from 'styled-components'

import typeImages           from './typeImages'
import Placeholder          from '../../../core/components/Placeholder'
import {
    ItemContainer,
    Picture,
    Info,
    Title,
    Meta,
} from '../../../core/components/IndexGrid'


const TypeIcon = styled.div`
    width:               72px;
    height:              72px;
    background-image:    ${props => `url(${typeImages[props.type]})`};
    background-size:     contain;
    background-repeat:   no-repeat;
    background-position: center center;
`

export const SourcesIndexLoadingItem = () => (
    <ItemContainer>
        <Placeholder
            width="136px" height="136px"
            style={{ margin: 12 }}
        />
        <Info>
            <Placeholder
                width="120px" height="20px"
                style={{ marginBottom: '9px' }}
            />
            <div>
                <Placeholder width="100%" height="14px" style={{ marginBottom: 9 }}/>
                <Placeholder width="66%" height="14px" style={{ marginBottom: 5 }}/>
            </div>
        </Info>
    </ItemContainer>
)

const SourcesIndexItem = ({ url, source }) => (
    <ItemContainer>
        <Link to={`${url}/${source.id}`}>
            <Picture
                style={{
                    backgroundColor: '#f3f4f8',
                }}
            >
                <TypeIcon type={source.type}/>
            </Picture>
        </Link>
        <Info>
            <Link to={`${url}/${source.id}`}>
                <Title>{source.name}</Title>
            </Link>
            <Meta
                style={{
                    maxHeight: 60,
                    overflow:  'hidden',
                }}
            >
                {source.description || ''}
            </Meta>
        </Info>
    </ItemContainer>
)

SourcesIndexItem.propTypes = {
    source: PropTypes.object.isRequired,
    url:    PropTypes.string.isRequired,
}

export default SourcesIndexItem
