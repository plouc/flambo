import React            from 'react'
import styled           from 'styled-components'

import { PRODUCT_NAME } from '../../config'


const transition = 'fill 800ms'

const PictoTopPart = styled.path`
    fill:       ${props => props.theme.logoPrimaryColor};
    transition: ${transition};
`

const PictoLeftPart = styled.path`
    fill:       ${props => props.theme.logoSecondaryColor};
    transition: ${transition};
`

const PictoRightPart = styled.path`
    fill:       ${props => props.theme.logoTertiaryColor};
    transition: ${transition};
`

export const Picto = ({
    size    = 32,
    spacing = 1,
    ...props,
}) => {
    const unit = (size - spacing * 2) / 3

    return (
        <svg width={size} height={size} {...props}>
            <PictoTopPart d={`M0 0 H ${size} V ${unit} H 0 L0 0`}/>
            <PictoLeftPart d={`M0 ${unit + spacing} H ${unit * 2 + spacing} V ${unit * 2 + spacing} H ${unit} V ${size} H 0 L0 ${unit + spacing}`}/>
            <PictoRightPart d={`M${unit * 2 + spacing * 2} ${unit + spacing} H ${size} V ${size} H ${unit + spacing} V ${unit * 2 + spacing * 2} H ${unit * 2 + spacing * 2} L${unit * 2 + spacing * 2} ${unit + spacing}`}/>
        </svg>
    )
}

const TypoContainer = styled.span`
    font-family:    Montserrat, sans-serif;
    text-transform: uppercase;
    font-weight:    500;
    margin-left:    12px;
    color:          ${props => props.theme.primaryColor};
`

export const Typo = props => (
    <TypoContainer {...props}>
        {PRODUCT_NAME}
    </TypoContainer>
)
