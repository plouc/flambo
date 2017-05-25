import React from 'react'
import _          from 'lodash'
import styled     from 'styled-components'
import ParametersTabs from './parameters_tabs'
import Responses from './responses'


const Container = styled.div`
    border-top: 1px solid rgba(0, 0, 0, .2);
`

const Description = styled.div`
    font-size: 16px;
    margin-top: 12px;
`

export default ({ operation }) => (
    <Container>
        <Description>
            {operation.description}
        </Description>
        <ParametersTabs {..._.groupBy(operation.parameters, 'in')}/>
        <Responses responses={operation.responses}/>
    </Container>
)