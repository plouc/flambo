import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
//import NpmBadge from '../../components/npm_badge'


const Install = styled.pre`
    background: #e5e6ea;
    padding: 12px 24px;
    border-radius: 2px;
`

export default () => (
    <div>
        <Helmet title="CLI"/>
        <h1>CLI</h1>
        {/*<NpmBadge pkg="cli"/>*/}
        <Install>
            yarn global add @flambo/cli
        </Install>
    </div>
)