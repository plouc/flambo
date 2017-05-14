import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import styled               from 'styled-components'


const borderColor = props => {
    if (props.primary) return props.theme.primaryColor
    return '#ccc'
}

const textColor = props => {
    if (props.primary) return props.theme.primaryTextColor
    return '#555'
}

const heights = {
    small:    22,
    standard: 28,
}

const paddings = {
    small:    '0 6px',
    standard: '0 9px',
}

const fontSizes = {
    small:    12,
    standard: 14,
}

const Wrapper = styled.div`
    height:         ${props => heights[props.size]}px;
    background:     transparent;
    color:          ${textColor};
    display:        inline-flex;
    padding:        ${props => paddings[props.size]};
    align-items:    center;
    border-radius:  1px;
    border:         1px solid ${borderColor};
    font-size:      ${props => fontSizes[props.size]}px;
    font-weight:    600;
    font-family:    'Rajdhani', sans-serif;
`

const Badge = ({ label, children, ...props }) => {
    let content
    if (label) {
        content = <FormattedMessage id={label}/>
    } else {
        content = children
    }

    return (
        <Wrapper {...props}>
            {content}
        </Wrapper>
    )
}

Badge.propTypes = {
    label:   PropTypes.string,
    primary: PropTypes.bool.isRequired,
    size:    PropTypes.oneOf(['small', 'standard']).isRequired,
}

Badge.defaultProps = {
    primary: false,
    size:    'standard',
}

export default Badge
