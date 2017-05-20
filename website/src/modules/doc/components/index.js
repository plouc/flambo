import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Nav from './navigation'
import Home from './home'
import RestApi from './rest_api'
import GraphqlApi from './graphql_api'
import ApiClient from './api_client'
import Bot from './bot'
import Webapp from './webapp'
import Cli from './cli'
import Sources from './sources'


const Container = styled.div`
    max-width: 1080px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 200px auto;
    grid-column-gap: 36px;
    padding: 24px 0;
`

export default ({ match }) => (
    <Container>
        <Helmet titleTemplate="%s | flambo documentation"/>
        <Nav/>
        <div>
            <Switch>
                <Route path={`${match.url}`} exact component={Home}/>
                <Route path={`${match.url}/api`} component={RestApi}/>
                <Route path={`${match.url}/graphql-api`} component={GraphqlApi}/>
                <Route path={`${match.url}/api-client`} component={ApiClient}/>
                <Route path={`${match.url}/bot`} component={Bot}/>
                <Route path={`${match.url}/webapp`} component={Webapp}/>
                <Route path={`${match.url}/cli`} component={Cli}/>
                <Route path={`${match.url}/sources`} component={Sources}/>
            </Switch>
        </div>
    </Container>
)