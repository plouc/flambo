import React, { PropTypes }  from 'react'
import styled, { withTheme } from 'styled-components'


export const Grid = styled.div`
    background:            white;
    padding:               60px;
    display:               grid;
    grid-column-gap:       ${props => props.xGap || 24}px;
    grid-row-gap:          ${props => props.yGap || 24}px;
    align-content:         start;
    grid-template-columns: ${props => props.xTemplate || '1fr 1fr 1fr'};
`

const yAlign = ({ yAlign }) => {
    if (yAlign === 'start') return 'flex-start'
    if (yAlign === 'end')   return 'flex-end'

    return 'space-between'
}

const xAlign = ({ xAlign }) => {
    if (xAlign === 'start') return 'flex-start'
    if (xAlign === 'end')   return 'flex-end'

    return 'stretch'
}

export const Cell = styled.div`
    display:           flex;
    flex-direction:    column;
    justify-content:   ${yAlign};
    align-items:       ${xAlign};
    grid-column-start: ${({ x }) => x || 'auto'};
    grid-column-end:   ${({ xSpan }) => xSpan ? `span ${xSpan}` : 'auto'};
    grid-row-start:    ${({ y }) => y || 'auto'};
`

export const Label = styled.label`
    color:          #838a8e;
    font-size:      11px;
    font-weight:    500;
    text-transform: uppercase;
    margin-bottom:  12px;
`

const ValueWrapper = styled.div`
    color:          #324150;
    font-weight:    500;
    border-bottom:  1px solid #d9e1ea;
    padding-bottom: 6px;
    display:        flex;
    align-items:    center;
`

const ValueComponent = ({ icon: _icon, children, theme }) => {
    let icon = null
    if (_icon) {
        icon = React.createElement(_icon, {
            color:   theme.iconColor,
            style:   { marginRight: 12 },
            viewBox: '0 0 27 27',
        })
    }

    return (
        <ValueWrapper>
            {icon}
            {children}
        </ValueWrapper>
    )
}

ValueComponent.propTypes = {
    icon: PropTypes.func,
}

export const Value = withTheme(ValueComponent)