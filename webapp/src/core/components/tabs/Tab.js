import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import styled               from 'styled-components'
import { Link, Route }      from 'react-router-dom'


const Container = styled.div`
    height:         100%;
    display:        flex;
    align-items:    center;
    text-transform: uppercase;
    padding:        4px 18px 0;
    font-size:      14px;
    border-bottom:  4px solid;
    color:          ${props => props.active ? 'black' : '#888'};
    border-color:   ${props => props.active ? props.theme.primaryColor : 'transparent'};
    font-weight:    ${props => props.active ? '600' : '400'};
    cursor:         pointer;
    font-family:    'Rajdhani', sans-serif;
    
    &:hover {
        border-color: ${props => props.theme.primaryColor};
    }
`

const Icon = styled.span`
    margin-right: 9px;
    font-size:    16px;
    color:        ${props => props.active ? props.theme.primaryColor : '#ddd'};
`

const Tab = ({ label, icon, children, to, exact = false }) => {
    let content
    if (label) {
        content = <FormattedMessage id={label}/>
    } else {
        content = children
    }

    return (
        <Route
            path={to}
            exact={exact}
            children={({ match }) => (
                <Link to={to}>
                    <Container active={match}>
                        {icon && (
                            <Icon active={match}>
                                {React.createElement(icon)}
                            </Icon>
                        )}
                        {content}
                    </Container>
                </Link>
            )}
        />
    )
}

Tab.propTypes = {
    label: PropTypes.string,
    to:    PropTypes.string.isRequired,
    exact: PropTypes.bool,
    icon:  PropTypes.func,
}

export default Tab
