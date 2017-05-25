import React from 'react'
import styled from 'styled-components'


const ParamName = styled.td`
    font-family: 'Fira mono';
    font-weight: 600;
    padding: 3px 6px 3px 0;
`

const ParamType = styled.td`
    font-family: 'Fira mono';
    padding: 3px 6px;
`

const ParamDefault = styled.td`
    padding: 3px 6px;
    text-align: right;
`

const ParamDesc = styled.td`
    color: #777;
    padding: 3px 0 3px 6px;
`

export default ({ parameter }) => {
    return (
        <tr>
            <ParamName>{parameter.name}</ParamName>
            <ParamType>{parameter.type}</ParamType>
            <ParamDefault>{parameter.default || 'n/a'}</ParamDefault>
            <ParamDesc>{parameter.description}</ParamDesc>
        </tr>
    )
}
