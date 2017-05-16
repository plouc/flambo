import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, Route }      from 'react-router-dom'
import styled               from 'styled-components'
import GroupsIcon           from 'react-icons/lib/md/people-outline'
import SettingsIcon         from 'react-icons/lib/fa/sliders'
import UsersIcon            from 'react-icons/lib/md/portrait'
import CollectionsIcon      from 'react-icons/lib/md/folder-open'
import SourcesIcon          from 'react-icons/lib/fa/bolt'
import AboutIcon            from 'react-icons/lib/md/info-outline'

import { Picto, Typo }      from './Logo'


const Item = styled.div`
    height:          36px;
    padding:         0 36px 0 20px;
    margin-bottom:   12px; 
    display:         flex;
    justify-content: space-between;
    align-items:     center;
    font-weight:     ${props => props.active ? '600' : '500'};
    color:           ${props => props.active ? '#000' : '#666'};
    border-left:     4px solid;
    border-color:    ${props => props.active ? props.theme.primaryColor : 'transparent'};
    font-family:     'Rajdhani', sans-serif;
    font-size:       17px;
    
    &:hover {
        font-weight: 600;
        color:       #333;
    }
`

const Icon = styled.div`
    font-size: 18px;
    color:     ${props => props.active ? props.theme.logoSecondaryColor : '#ddd'};
`

const styles = {
    header: {
        height:       '60px',
        display:      'flex',
        alignItems:   'center',
        padding:      '0 24px',
        marginBottom: '12px',
    },
}

const NavigationItem = ({ label, to, icon, exact }) => (
    <Route
        path={to}
        exact={exact}
        children={({ match }) => (
            <Link to={to}>
                <Item active={match}>
                    <FormattedMessage id={label}/>
                    <Icon active={match}>
                        {icon && React.createElement(icon)}
                    </Icon>
                </Item>
            </Link>
        )}
    />
)

export default class Navigation extends Component {
    render() {
        return (
            <div>
                <Link to="/" style={styles.header}>
                    <Picto size={30} spacing={1}/>
                    <Typo/>
                </Link>
                <NavigationItem label="groups"      to="/groups"      icon={GroupsIcon}/>
                <NavigationItem label="users"       to="/users"       icon={UsersIcon}/>
                <NavigationItem label="sources"     to="/sources"     icon={SourcesIcon}/>
                <NavigationItem label="collections" to="/collections" icon={CollectionsIcon}/>
                <NavigationItem label="settings"    to="/settings"    icon={SettingsIcon}/>
                <NavigationItem label="about"       to="/about"       icon={AboutIcon}/>
            </div>
        )
    }
}