import React                 from 'react'
import styled, { keyframes } from 'styled-components'


const Loader = styled.div`
    position: absolute;
    top:      12px;
    right:    12px;
    z-index:  2;
`

const loading = keyframes`
    0%   { opacity: 1;  }
    50%  { opacity: .5; }
    100% { opacity: 1;  }
`

const Cursor = styled.div`
    display:          block;
    width:            8px;
    height:           8px;
    border-radius:    5px;
    background-color: #e0c389;
    animation:        ${loading} 400ms linear infinite;
    opacity:          1;
    transform-origin: center center;
`

export default props => (
    <Loader {...props}>
        <Cursor/>
    </Loader>
)