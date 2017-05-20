import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import RestApiIcon from 'react-icons/lib/md/link'
import GraphqlApiIcon from 'react-icons/lib/md/share'
import ApiClientIcon from 'react-icons/lib/fa/code'
import WebappIcon from 'react-icons/lib/md/devices'
import CliIcon from 'react-icons/lib/fa/terminal'
import BotIcon from 'react-icons/lib/fa/cogs'
import SourcesIcon from 'react-icons/lib/md/call-merge'


const Container = styled.div`
    border-right: 1px solid rgba(0, 0, 0, .07);
`

const Nav = styled.nav`
    padding-top: 20px;
    position: sticky;
    top: 84px;
`

const NavItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 24px 9px 0;
    cursor: pointer;
    font-weight: 600;
    border-right: 1px solid transparent;
    margin-right: -1px;
    text-decoration: none;
    color: #555;
    
    .active & {
        border-right-color: #17385d;
        color: #000;
    }
    
    &:hover {
        border-right-color: #6f9ad1;
    }
    
    & path {
        fill: #8eabca; 
    }
    
    .active & path {
        fill: #3e6096;
    }
`

const MenuItem = ({ to, children }) => (
    <NavLink
        to={to}
        activeClassName="active"
        style={{ textDecoration: 'none' }}
    >
        <NavItem>
            {children}
        </NavItem>
    </NavLink>
)

export default () => (
    <Container>
        <Nav>
            <MenuItem to="/doc/api">
                Rest API
                <RestApiIcon color="#3e6096"/>
            </MenuItem>
            <MenuItem to="/doc/graphql-api">
                GraphQL API
                <GraphqlApiIcon color="#3e6096"/>
            </MenuItem>
            <MenuItem to="/doc/api-client">
                API client
                <ApiClientIcon color="#3e6096"/>
            </MenuItem>
            <MenuItem to="/doc/webapp">
                Webapp
                <WebappIcon color="#3e6096"/>
            </MenuItem>
            <MenuItem to="/doc/bot">
                Bot
                <BotIcon color="#3e6096"/>
            </MenuItem>
            <MenuItem to="/doc/cli">
                CLI
                <CliIcon color="#3e6096"/>
            </MenuItem>
            <MenuItem to="/doc/sources">
                Sources
                <SourcesIcon color="#3e6096"/>
            </MenuItem>
        </Nav>
    </Container>
)