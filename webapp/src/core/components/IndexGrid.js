import styled from 'styled-components'


export const ItemContainer = styled.div`
    height:           160px;
    background-color: white;
    box-shadow:       0 1px 2px rgba(0, 0, 0, .75);
    display:          flex;
    flex-direction:   row;
    borderRadius:     2px;
    overflow:         hidden;
    position:         relative;
`

export const Picture = styled.div`
    background-size:     contain;
    background-color:    ${props => props.url ? '#f3f4f8' : props.theme.logoSecondaryColor};
    opacity:             ${props => props.url ? 1 : .6};
    background-repeat:   no-repeat;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    width:               160px;
    height:              160px;
    border:              12px solid white;
    color:               white;
    display:             flex;
    justify-content:     center;
    align-items:         center;
    font-size:           42px;
    font-family:         'Rajdhani', sans-serif;
    font-weight:         300;
`

export const Info = styled.div`
    display:         flex;
    flex-direction:  column;
    flex:            1;
    padding:         18px 24px;
    justify-content: space-between;
`

export const Title = styled.div`
    margin-bottom: 3px;
    color:         black;
    font-weight:   600;
    font-size:     18px;
    font-family:   'Rajdhani', sans-serif;
`

export const Footer = styled.div`
    display:         flex;
    justify-content: flex-end;
`


export const Meta = styled.div`
    font-size: 13px;
    color:     #777;
`
