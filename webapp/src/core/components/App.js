import React, { Component, PropTypes } from 'react'
import { ThemeProvider }               from 'styled-components'
import Helmet                          from 'react-helmet'
import { Switch, Route, Redirect }     from 'react-router-dom'

import Login                           from '../../modules/auth/containers/Login'
import AuthenticatedApp                from '../containers/AuthenticatedAppContainer'
import { PRODUCT_NAME }                from '../../config'
import { themeFromPath }               from '../theme'


export default class App extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    }

    render() {
        const { isAuthenticated, location } = this.props

        return (
            <ThemeProvider theme={themeFromPath(location.pathname)}>
                <div>
                    <Helmet
                        titleTemplate={`${PRODUCT_NAME} | %s`}
                        defaultTitle={PRODUCT_NAME}
                    />
                    <Switch>
                        <Route path="/login" component={Login}/>
                        {isAuthenticated && <Route component={AuthenticatedApp}/>}
                        {!isAuthenticated && <Redirect to="/login"/>}
                    </Switch>
                </div>
            </ThemeProvider>
        )
    }
}
