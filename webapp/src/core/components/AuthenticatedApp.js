import React                from 'react'
import styled               from 'styled-components'
import { Route, Switch }    from 'react-router-dom'

import LogoutButton         from '../../modules/auth/containers/LogoutButtonContainer'
import Home                 from './Home'
import Users                from '../../modules/users/components/Users'
import Groups               from '../../modules/groups/components/Groups'
import Sources              from '../../modules/sources/components/Sources'
import Collections          from '../../modules/collections/components/Collections'
import Settings             from '../../modules/settings/containers/SettingsContainer'
import About                from '../../modules/about/components/About'
import PageNotFound         from './PageNotFound'
import Navigation           from './Navigation'


const Wrapper = styled.div`
`

const Sidebar = styled.div`
    position:   fixed;
    top:        0;
    bottom:     0;
    left:       0;
    width:      240px;
    background: white;
    z-index:    10;
    box-shadow: 1px 0 2px rgba(0, 0, 0, .15);
`

const Content = styled.div`
    position:   fixed;
    top:        60px;
    right:      0;
    bottom:     0;
    left:       240px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index:    9;
`

const AppBar = styled.div`
    position:    fixed;
    top:         0;
    right:       0;
    left:        240px;
    width:       100%;
    height:      60px;
    background:  ${props => props.theme.secondaryColor};
    z-index:     8;
    box-shadow:  0 1px 2px rgba(0, 0, 0, .35);
    display:     flex;
    padding:     0 60px;
    align-items: center;
    color:       white;
    transition:  background 400ms;
`

const AuthenticatedApp = () => (
    <Wrapper>
        <Sidebar>
            <Navigation/>
        </Sidebar>
        <AppBar>
            <LogoutButton/>
        </AppBar>
        <Content>
            <Switch>
                <Route path="/"            component={Home} exact/>
                <Route path="/users"       component={Users}/>
                <Route path="/groups"      component={Groups}/>
                <Route path="/sources"     component={Sources}/>
                <Route path="/collections" component={Collections}/>
                <Route path="/settings"    component={Settings}/>
                <Route path="/about"       component={About}/>
                <Route                     component={PageNotFound}/>
            </Switch>
        </Content>
    </Wrapper>
)

export default AuthenticatedApp
