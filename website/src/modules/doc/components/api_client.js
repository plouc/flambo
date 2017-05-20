import React from 'react'
import styled from 'styled-components'
//import NpmBadge from '../../components/npm_badge'


const Install = styled.pre`
    background: #e5e6ea;
    padding: 12px 24px;
    border-radius: 2px;
`

export default () => (
    <div>
        <h1>API client</h1>
        {/*<NpmBadge pkg="api-client"/>*/}
        <Install>
            yarn global add @flambo/api-client
        </Install>
    </div>
)