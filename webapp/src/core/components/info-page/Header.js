import styled from 'styled-components'


export default styled.div`
    height:                120px;
    background-color:      ${props => props.theme.primaryColor};
    color:                 white;
    display:               grid;
    padding:               12px 60px;
    grid-template-columns: 264px auto 264px;
    grid-column-gap:       24px;
    align-items:           end;
    overflow:              hidden;
`
