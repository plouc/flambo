import React, { Component, PropTypes } from 'react'
import styled, { ThemeProvider }       from 'styled-components'
import Helmet                          from 'react-helmet'
import { Route, Switch, Redirect }     from 'react-router-dom'

import Login                           from '../../modules/auth/containers/Login'
import Users                           from '../../modules/users/components/Users'
import Groups                          from '../../modules/groups/components/Groups'
import Sources                         from '../../modules/sources/components/Sources'
import Collections                     from '../../modules/collections/components/Collections'
import PageNotFound                    from './PageNotFound'
import Navigation                      from './Navigation'
import { PRODUCT_NAME }                from '../../config'


const Wrapper = styled.div`
`

const Sidebar = styled.div`
    position:   fixed;
    top:        0;
    bottom:     0;
    left:       0;
    width:      240px;
    background: white;
    box-shadow: 1px 0 2px rgba(0,0,0,.15);
    z-index:    10;
`

const Content = styled.div`
    position:   fixed;
    top:        0;
    right:      0;
    bottom:     0;
    left:       240px;
    overflow-x: hidden;
    overflow-y: auto;
`

export default class App extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    }

    render() {
        const { isAuthenticated } = this.props

        return (
            <ThemeProvider theme={{}}>
                <Wrapper>
                    <Helmet
                        titleTemplate={`${PRODUCT_NAME} | %s`}
                        defaultTitle={PRODUCT_NAME}
                    />
                    <Sidebar>
                        <Navigation/>
                    </Sidebar>
                    <Content>
                        <Route path="/login" component={Login}/>
                        {!isAuthenticated && <Redirect to="/login"/>}
                        {isAuthenticated && (
                            <Switch>
                                <Route path="/users"       component={Users}/>
                                <Route path="/groups"      component={Groups}/>
                                <Route path="/sources"     component={Sources}/>
                                <Route path="/collections" component={Collections}/>
                            </Switch>
                        )}
                        <Route component={PageNotFound}/>
                    </Content>
                </Wrapper>
            </ThemeProvider>
        )
    }
}
