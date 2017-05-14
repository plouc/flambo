import React, { PropTypes } from 'react'
import styled               from 'styled-components'

import { Cell }             from '../../../core/components/Grid'
import { Name }             from '../../../core/components/card'
import typeImages           from './typeImages'


const Description = styled.div`
    font-size: 14px;
`

const TypeIcon = styled.div`
    position:            absolute;
    width:               48px;
    height:              48px;
    top:                 6px;
    right:               6px;
    background-image:    ${props => `url(${typeImages[props.type]})`};
    background-size:     contain;
    background-repeat:   no-repeat;
    background-position: center center;
`

const cellStyle = {
    height:          160,
    padding:         24,
    backgroundColor: 'white',
    boxShadow:       '0 1px 2px rgba(0,0,0,0.07)',
    cursor:          'pointer',
    position:        'relative',
}

const SourcesIndexItem = ({ url, history, source }) => (
    <Cell
        onClick={() => history.push(`${url}/${source.id}`)}
        style={cellStyle}
    >
        <Name>{source.name}</Name>
        <TypeIcon type={source.type}/>
        <Description>
            {source.description || ''}
        </Description>
    </Cell>
)

SourcesIndexItem.propTypes = {
    source: PropTypes.object.isRequired,
    url:    PropTypes.string.isRequired,
}

export default SourcesIndexItem
