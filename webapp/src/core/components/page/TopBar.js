import styled from 'styled-components'


export default styled.div`
    position:        fixed;
    height:          60px;
    background:      ${props => props.theme.primaryColor};
    color:           white;
    display:         flex;
    padding:         0 60px;
    justify-content: space-between;
    align-items:     center;
    top:             60px;
    right:           0;
    left:            240px;
    //box-shadow:      0 1px 2px rgba(0, 0, 0, .35);
    border-bottom:   1px solid ${props => props.theme.secondaryColor};
    z-index:         8;
`
