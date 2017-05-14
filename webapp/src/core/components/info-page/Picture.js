import styled from 'styled-components'


export default styled.div`
    display:             block;
    width:               96px;
    height:              96px;
    box-shadow:          0 3px 6px rgba(0, 0, 0, .15);
    background-color:    #FFF;
    background-size:     contain;
    background-repeat:   no-repeat;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    border:              6px solid white;
`
