import React, { PropTypes } from 'react'
import range                from 'lodash/range'
import styled               from 'styled-components'

import { blink }            from '../animations'


const SkeletonLine = styled.div`
    background:    #eee;
    height:        16px;
    border-radius: 2px;
    margin-bottom: 3px;
    animation:     ${blink} 600ms linear infinite;
    width:         ${props => props.isLast ? '66' : '100'}%;
`

const Description = ({ lineCount }) => (
    <div>
        {range(lineCount).map(i => (
            <SkeletonLine key={i} isLast={i === lineCount - 1}/>
        ))}
    </div>
)

Description.propTypes = {
    lineCount: PropTypes.number.isRequired,
}

Description.defaultProps = {
    lineCount: 2,
}

export default Description
