import { PropTypes } from 'react'
import styled        from 'styled-components'


const Picture = styled.div`
    display:             flex;
    justify-content:     center;
    align-items:         center;
    width:               ${props => props.size}px;
    height:              ${props => props.size}px;
    box-shadow:          0 3px 6px rgba(0, 0, 0, .15);
    background-color:    ${props => props.url ? 'white' : props.theme.accentColor};
    background-size:     contain;
    background-repeat:   no-repeat;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    border:              ${props => Math.round(props.size / 16)}px solid ${props => props.url ? 'white' : props.theme.accentColor};
    color:               ${props => props.theme.primaryColor};
    font-family:         'Rajdhani', sans-serif;
    font-weight:         300;
    font-size:           ${props => props.size / 1.5 }px;
`

Picture.propTypes = {
    url:  PropTypes.string,
    size: PropTypes.number.isRequired,
}

Picture.defaultProps = {
    size: 96,
}

export default Picture
