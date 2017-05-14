import styled    from 'styled-components'

import { blink } from '../animations'


export default styled.span`
    background:    #eee;
    width:         120px;
    height:        20px;
    border-radius: 2px;
    animation:     ${blink} 600ms linear infinite;
`