import React  from 'react'
import styled from 'styled-components'


const LogoTopPart = styled.path`
    fill: ${props => props.theme.logoPrimaryColor};
    transition: fill 800ms;
`

const LogoLeftPart = styled.path`
    fill: ${props => props.theme.logoSecondaryColor};
    transition: fill 800ms;
`

const LogoRightPart = styled.path`
    fill: ${props => props.theme.logoTertiaryColor};
    transition: fill 800ms;
`

export default ({
    size    = 32,
    spacing = 1,
    ...props,
}) => {
    const unit = (size - spacing * 2) / 3

    return (
        <svg width={size} height={size} {...props}>
            <LogoTopPart d={`M0 0 H ${size} V ${unit} H 0 L0 0`}/>
            <LogoLeftPart d={`M0 ${unit + spacing} H ${unit * 2 + spacing} V ${unit * 2 + spacing} H ${unit} V ${size} H 0 L0 ${unit + spacing}`}/>
            <LogoRightPart d={`M${unit * 2 + spacing * 2} ${unit + spacing} H ${size} V ${size} H ${unit + spacing} V ${unit * 2 + spacing * 2} H ${unit * 2 + spacing * 2} L${unit * 2 + spacing * 2} ${unit + spacing}`}/>
        </svg>
    )
}
