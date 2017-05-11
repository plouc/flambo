import React, { PropTypes } from 'react'
import styled               from 'styled-components'
import { Link }             from 'react-router-dom'
import { FormattedMessage } from 'react-intl'


const Container = styled.div`
    background-color: #fff;
    box-shadow:       0 1px 2px rgba(0, 0, 0, .07);
    padding-bottom:   6px;
`

const Title = styled.div`
    padding:        12px 12px 6px;
    font-weight:    500;
    text-transform: uppercase;
    font-size:      14px;
`

const Item = styled.div`
    font-size:   14px;
    padding:     6px 12px;
    display:     flex;
    align-items: center;
    
    &:hover {
        font-weight: 500;
        color:       #000;
    }
`

const Picture = styled.div`
    width:               36px;
    height:              36px;
    background:          black;
    margin-right:        12px;
    background-size:     contain;
    background-color:    #fff;
    background-repeat:   no-repeat;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    border:              1px solid rgba(0, 0, 0, .1);
`

const UserGroups = ({
    groups,
}) => {
    return (
        <Container>
            <Title>
                <FormattedMessage id="groups"/>
            </Title>
            {groups.map(group => (
                <Link key={group.id} to={`/groups/${group.id}`}>
                    <Item>
                        <Picture url={group.picture_url}/>
                        {group.name}
                    </Item>
                </Link>
            ))}
        </Container>
    )
}

UserGroups.propTypes = {
    groups: PropTypes.array.isRequired,
}

export default UserGroups
