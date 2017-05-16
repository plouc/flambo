import styled    from 'styled-components'

import { blink } from './animations'


export default styled.div`
    background:    #eee;
    width:         ${props => props.width};
    height:        ${props => props.height};
    border-radius: 2px;
    animation:     ${blink} 600ms linear infinite;
`
