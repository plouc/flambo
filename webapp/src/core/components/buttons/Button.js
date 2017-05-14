import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import { withRouter }       from 'react-router-dom'
import styled               from 'styled-components'


const borderColor = props => {
    if (props.disabled) return props.theme.disabledColor
    if (props.primary)  return props.theme.primaryColor
    return '#ccc'
}

const textColor = props => {
    if (props.disabled) return props.theme.disabledTextColor
    if (props.primary)  return props.theme.primaryTextColor
    return '#555'
}

const hoverBackgroundColor = props => {
    if (props.disabled) return 'transparent'
    if (props.primary)  return props.theme.primaryColor
    return '#aaa'
}

const hoverTextColor = props => {
    if (props.disabled) return props.theme.disabledTextColor
    return 'white'
}

const heights = {
    small:    28,
    standard: 36,
}

const fontSizes = {
    small:    12,
    standard: 14,
}

const Wrapper = styled.div`
    cursor:         pointer;
    height:         ${props => heights[props.size]}px;
    background:     transparent;
    color:          ${textColor};
    display:        inline-flex;
    padding:        0 12px;
    align-items:    center;
    border-radius:  1px;
    border:         1px solid ${borderColor};
    font-size:      ${props => fontSizes[props.size]}px;
    font-weight:    600;
    text-transform: uppercase;
    font-family:    'Rajdhani', sans-serif;
    
    &:hover {
        background: ${hoverBackgroundColor};
        color:      ${hoverTextColor};
    }
`

const Button = ({ label, children, to, history, ..._props }) => {
    const props = { ..._props }
    if (to !== undefined) {
        props.onClick = () => { history.push(to) }
    }

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

Button.propTypes = {
    label:   PropTypes.string,
    to:      PropTypes.string,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    primary: PropTypes.bool.isRequired,
    size:    PropTypes.oneOf(['small', 'standard']).isRequired,
}

Button.defaultProps = {
    primary: false,
    size:    'standard',
}

export default withRouter(Button)
