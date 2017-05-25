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
            <div>
                <NavLink
                    to={`${basePath}/module-collections`}
                    style={
                        { textDecoration: 'none' }
                    }
                    activeClassName="active"
                >
                    <NavItem>collections</NavItem>
                </NavLink>
                <Route path={`${basePath}/module-collections`} render={() => (
                    <div>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-collections`,
                                    search:   `?method=find`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>find</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-collections`,
                                    search:   `?method=get`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>get</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-collections`,
                                    search:   `?method=create`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>create</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-collections`,
                                    search:   `?method=feed`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>feed</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-collections`,
                                    search:   `?method=comments`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>comments</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-collections`,
                                    search:   `?method=subscribers`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>subscribers</Method>
                        </NavLink>
                    </div>
                )}/>
            </div>
            <div>
                <NavLink
                    to={`${basePath}/module-groups`}
                    style={
                        { textDecoration: 'none' }
                    }
                    activeClassName="active"
                >
                    <NavItem>groups</NavItem>
                </NavLink>
                <Route path={`${basePath}/module-groups`} render={() => (
                    <div>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-groups`,
                                    search:   `?method=find`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>find</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-groups`,
                                    search:   `?method=get`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>get</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-groups`,
                                    search:   `?method=create`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>create</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-groups`,
                                    search:   `?method=feed`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>feed</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-groups`,
                                    search:   `?method=comments`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>comments</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-groups`,
                                    search:   `?method=sources`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>sources</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-groups`,
                                    search:   `?method=members`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>members</Method>
                        </NavLink>
                    </div>
                )}/>
            </div>
            <div>
                <NavLink
                    to={`${basePath}/module-sources`}
                    style={
                        { textDecoration: 'none' }
                    }
                    activeClassName="active"
                >
                    <NavItem>sources</NavItem>
                </NavLink>
                <Route path={`${basePath}/module-sources`} render={() => (
                    <div>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-sources`,
                                    search:   `?method=find`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>find</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-sources`,
                                    search:   `?method=get`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>get</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-sources`,
                                    search:   `?method=feed`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>feed</Method>
                        </NavLink>
                    </div>
                )}/>
            </div>
            <div>
                <NavLink
                    to={`${basePath}/module-users`}
                    style={
                        { textDecoration: 'none' }
                    }
                    activeClassName="active"
                >
                    <NavItem>users</NavItem>
                </NavLink>
                <Route path={`${basePath}/module-users`} render={() => (
                    <div>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-users`,
                                    search:   `?method=find`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>find</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-users`,
                                    search:   `?method=get`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>get</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-users`,
                                    search:   `?method=feed`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>feed</Method>
                        </NavLink>
                        <NavLink
                            to={
                                {
                                    pathname: `${basePath}/module-users`,
                                    search:   `?method=comments`,
                                }
                            }
                            style={
                                { textDecoration: 'none' }
                            }
                            activeClassName="active"
                        >
                            <Method>comments</Method>
                        </NavLink>
                    </div>
                )}/>
            </div>
        </Nav>
    )
}