import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import styled                          from 'styled-components'

import typeImages                      from './typeImages'


const Container = styled.div`
    display:         flex;
    flex-wrap:       wrap;
    padding:         60px;
    justify-content: center;
`

const Message = styled.div`
    width:      100%;
    text-align: center;
    margin-top: 60px;
`

const ItemLogo = styled.div`
    width:               100%;
    height:              100px;
    margin-top:          12px;
    background-image:    ${props => `url(${typeImages[props.type]})`};
    background-size:     contain;
    background-repeat:   no-repeat;
    background-position: center center;
`

const ItemName = styled.div`
    width:        100%;
    height:       48px;
    background:   rgba(255, 255, 255, .75);
    text-align:   center;
    line-height:  48px;
`

const Item = styled.div`
    cursor:           pointer;
    width:            160px;
    height:           160px;
    display:          flex;
    flex-direction:   column;
    align-items:      center;
    box-shadow:       0 3px 5px rgba(0, 0, 0, .1);
    font-weight:      500;
    margin-left:      36px;
    color:            #999;
    border-radius:    3px;
    background-color: white;
    
    &:first-child {
        margin-left: 0;
    }
    
    &:hover {
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        color:      #000;
    }
`

export default class SourceTypeSelector extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
    }

    render() {
        const { onChange } = this.props

        return (
            <div>
                <Message>
                    <FormattedMessage id="source_select_type"/>
                </Message>
                <Container>
                    <Item onClick={() => { onChange('rss') }}>
                        <ItemLogo type="rss"/>
                        <ItemName>RSS</ItemName>
                    </Item>
                    <Item onClick={() => { onChange('meetup') }}>
                        <ItemLogo type="meetup"/>
                        <ItemName>Meetup</ItemName>
                    </Item>
                </Container>
            </div>
        )
    }
}