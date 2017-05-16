import React, { PropTypes } from 'react'
import { Link }             from 'react-router-dom'
import styled               from 'styled-components'

import typeImages           from './typeImages'
import Placeholder          from '../../../core/components/Placeholder'
import {
    ItemContainer,
    Title,
    Meta,
} from '../../../core/components/IndexGrid'


const TypeIcon = styled.div`
    position:            absolute;
    width:               36px;
    height:              36px;
    top:                 9px;
    right:               9px;
    background-image:    ${props => `url(${typeImages[props.type]})`};
    background-size:     contain;
    background-repeat:   no-repeat;
    background-position: center center;
`

const styles = {
    container: {
        padding:        '18px 24px',
        flexDirection:  'column',
        justifyContent: 'space-between',
    },
}

export const SourcesIndexLoadingItem = () => (
    <ItemContainer style={styles.container}>
        <div>
            <Placeholder
                width="120px" height="20px"
                style={{ marginBottom: '9px' }}
            />
            <Placeholder
                width="36px" height="36px"
                style={{
                    position: 'absolute',
                    top:      9,
                    right:    9,
                }}
            />
        </div>
        <div>
            <Placeholder width="100%" height="14px" style={{ marginBottom: 9 }}/>
            <Placeholder width="66%" height="14px" style={{ marginBottom: 5 }}/>
        </div>
    </ItemContainer>
)

const SourcesIndexItem = ({ url, source }) => (
    <ItemContainer style={styles.container}>
        <div>
            <Link to={`${url}/${source.id}`}>
                <Title>{source.name}</Title>
            </Link>
            <TypeIcon type={source.type}/>
        </div>
        <Meta>
            {source.description || ''}
        </Meta>
    </ItemContainer>
)

SourcesIndexItem.propTypes = {
    source: PropTypes.object.isRequired,
    url:    PropTypes.string.isRequired,
}

export default SourcesIndexItem
