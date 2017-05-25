import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { PrismCode } from 'react-prism'

import Root from './doc/root'
import Navigation from './doc/navigation'

const Container = styled.div`
    display: grid;
    grid-template-columns: auto 200px;
    grid-column-gap: 36px;
`

const Install = styled.pre`
    background: #e5e6ea;
    padding: 12px 24px;
    border-radius: 2px;
`

const Aside = styled.div`
    border-left: 1px solid rgba(0, 0, 0, .07);
`

const Content = styled.div`
    overflow: hidden;
`

export default ({ match }) => (
    <Container>
        <Helmet title="API client"/>
        <Content>
            <h1>API client</h1>
            <Root basePath={match.url}>
                <div>
                    <h2>Install</h2>
                    <Install>
                        yarn add @flambo/api-client
                    </Install>
                    <h2>Initializing the client</h2>
                    <div>
                        <pre>
                        <PrismCode className="language-javascript">
                            {`
const api = require('@flambo/api-client')

const client = api.client({
    apiUrl: 'http://localhost:7000/api/v1',
    token:  'xxxxx',
})`.trim()}
                        </PrismCode>
                        </pre>
                    </div>
                </div>
            </Root>
        </Content>
        <Aside>
            <Navigation basePath={match.url}/>
        </Aside>
    </Container>
)