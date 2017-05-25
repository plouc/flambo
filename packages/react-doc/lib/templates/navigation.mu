import React              from 'react'
import { NavLink, Route } from 'react-router-dom'
import styled             from 'styled-components'

const Nav = styled.nav`
    padding-top: 20px;
    position: sticky;
    top: 84px;
`

const NavItem = styled.div`
    cursor: pointer;
    font-weight: 600;
    padding: 3px 0 3px 24px;
    margin-left: -1px;
    border-left: 1px solid transparent;
    color: #555;
    text-decoration: none;

    .active & {
        border-left-color: #17385d;
        color: #000;
    }
`


const Method = styled.div`
    font-size: 14px;
    cursor: pointer;
    padding-left: 24px;
`

export default ({ basePath }) => {
    return (
        <Nav>
            <NavLink
                to={basePath}
                style={
                    { textDecoration: 'none' }
                }
                exact
                activeClassName="active"
            >
                <NavItem>index</NavItem>
            </NavLink>
        {{#items}}
            <div>
                <NavLink
                    to={`${basePath}/{{path}}`}
                    style={
                        { textDecoration: 'none' }
                    }
                    activeClassName="active"
                >
                    <NavItem>{{name}}</NavItem>
                </NavLink>
                <Route path={`${basePath}/{{path}}`} render={() => (
                    <div>
                    {{#methods}}
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/{{path}}`,
                                    search:   `?method={{name}}`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>{{name}}</Method>
                        </NavLink>
                    {{/methods}}
                    </div>
                )}/>
            </div>
        {{/items}}
        </Nav>
    )
}