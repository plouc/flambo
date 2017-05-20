import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
//import NpmBadge      from '../../components/npm_badge'


const Install = styled.pre`
    background: #e5e6ea;
    padding: 12px 24px;
    border-radius: 2px;
`

export default () => (
    <div>
        <Helmet title="Bot"/>
        <h1>Bot</h1>
        {/*<NpmBadge pkg="bot"/>*/}
        <Install>
            yarn global add @flambo/bot
        </Install>
    </div>
)