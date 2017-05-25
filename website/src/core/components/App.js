import React from 'react'
import { Link, NavLink, Switch, Route }      from 'react-router-dom'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import DocIcon    from 'react-icons/lib/fa/book'
import GithubIcon from 'react-icons/lib/fa/github-alt'
import Home from './home'
import Doc from '../../modules/doc/components'


import Logo from '../../../assets/images/flambo_logo.png'

const Header = styled.header`
    height:     60px;
    background: #17385d;
    color:      #bbc9d7;
    position:   fixed;
    top:        0;
    right:      0;
    left:       0;
    z-index:    100;
`

const InnerHeader = styled.div`
    max-width:       1280px;
    height:          60px;
    display:         flex;
    justify-content: space-between;
    align-items:     center;
    margin:          0 auto;
`

const Content = styled.div`
    margin-top: 60px;
    min-height: 360px;
`

const Nav = styled.nav`
    display:     flex;
    align-items: center;
`

const NavItem = styled.div`
    height:         60px;
    padding:        0 12px;
    text-transform: uppercase;
    font-weight:    600;
    font-size:      13px;
    display:        flex;
    align-items:    center;
    
    &:hover,
    .active & {
        color: white;
    }
`

export default ({
    children,
    title = 'This is the default title',
}) => (
    <div>
        <Helmet
            titleTemplate="%s | flambo"
            title="Home"
        />
        <Header>
            <InnerHeader>
                <Link to="/" style={{ height: '100%' }}>
                    <img src={Logo} alt="flambo" style={{ height: 36, marginTop: 12 }}/>
                </Link>
                <Nav>
                    <NavLink to="/doc" activeClassName="active" style={{ textDecoration: 'none' }}>
                        <NavItem>
                            <DocIcon style={{ marginRight: 9 }}/>
                            documentation
                        </NavItem>
                    </NavLink>
                    <a
                        href="https://github.com/plouc/flambo"
                        style={{ textDecoration: 'none' }}
                        target="_blank"
                    >
                        <NavItem>
                            <GithubIcon style={{ marginRight: 9 }}/>
                            github
                        </NavItem>
                    </a>
                </Nav>
            </InnerHeader>
        </Header>
        <Content>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/doc" component={Doc}/>
            </Switch>
        </Content>
    </div>
)
