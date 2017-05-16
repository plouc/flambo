import styled from 'styled-components'


export default styled.div`
    position:     fixed;
    top:          0;
    left:         240px;
    height:       60px;
    padding-left: 60px;
    display:      flex;
    align-items:  center;
    opacity:      ${props => props.isVisible ? 1 : 0};
    transform:    translate3d(0, ${props => props.isVisible ? 0 : -60}px, 0);
    transition:   transform 300ms cubic-bezier(0, 0, .2, 1), opacity 300ms cubic-bezier(0, 0, .2, 1);
`
