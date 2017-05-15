import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, Route }      from 'react-router-dom'
import styled               from 'styled-components'

import { PRODUCT_NAME }     from '../../config'
import LogoPicto                 from './LogoPicto'


const Header = styled.div`
    height:        60px;
    display:       flex;
    align-items:   center;
    padding:       0 24px;
    margin-bottom: 12px;
`

const BrandName = styled.span`
    font-family:    Montserrat, sans-serif;
    text-transform: uppercase;
    font-weight:    500;
    margin-left:    12px;
    color:          ${props => props.theme.primaryColor};
`

const Item = styled.div`
    height:        36px;
    padding:       0 24px 0 20px;
    margin-bottom: 12px; 
    display:       flex;
    align-items:   center;
    font-weight:   ${props => props.active ? '600' : '500'};
    color:         ${props => props.active ? '#000' : '#666'};
    border-left:   4px solid;
    border-color:  ${props => props.active ? props.theme.primaryColor : 'transparent'};
    font-family:   'Rajdhani', sans-serif;
    font-size:     17px;
    
    &:hover {
        font-weight: 600;
        color:       #333;
    }
`

const NavigationItem = ({ label, to, exact }) => (
    <Route
        path={to}
        exact={exact}
        children={({ match }) => (
            <Link to={to}>
                <Item active={match}>
                    <FormattedMessage id={label}/>
                </Item>
            </Link>
        )}
    />
)

export default class Navigation extends Component {
    render() {
        return (
            <div>
                <Header>
                    <LogoPicto size={30} spacing={1}/>
                    <BrandName>{PRODUCT_NAME}</BrandName>
                </Header>
                <NavigationItem label="groups" to="/groups"/>
                <NavigationItem label="users" to="/users"/>
                <NavigationItem label="sources" to="/sources"/>
                <NavigationItem label="collections" to="/collections"/>
                <NavigationItem label="settings" to="/settings"/>
            </div>
        )
    }
}