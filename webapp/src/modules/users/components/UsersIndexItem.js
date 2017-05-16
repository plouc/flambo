import React, { PropTypes } from 'react'
import { Link }             from 'react-router-dom'
import styled               from 'styled-components'
//import { FormattedMessage } from 'react-intl'

import { Info, Title, Meta } from '../../../core/components/IndexGrid'
import Placeholder           from '../../../core/components/Placeholder'


const ListItem = styled.div`
    display:          flex;
    padding:          0 24px;
    align-items:      flex-start;
    border-top:       1px solid #f3f4f8;
    background-color: #FFF;
    
    &:first-child {
        border-width: 0;
    }
`

const Avatar = styled.div`
    width:               60px;
    height:              60px;
    margin-top:          12px;
    opacity:             ${props => props.url ? 1 : .6};
    background-color:    ${props => props.url ? '#f3f4f8' : props.theme.logoSecondaryColor};
    background-repeat:   no-repeat;
    background-size:     cover;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    border:              1px solid rgba(0, 0, 0, .1);
    color:               white;
    display:             flex;
    justify-content:     center;
    align-items:         center;
    font-size:           26px;
    font-family:         'Rajdhani', sans-serif;
    font-weight:         300;
`

export const UsersIndexLoadingItem = props => (
    <ListItem {...props}>
        <Placeholder
            width="60px" height="60px"
            style={{ marginTop: '12px' }}
        />
        <Info>
            <Placeholder
                width="120px" height="20px"
                style={{ marginBottom: '9px' }}
            />
            <Placeholder width="180px" height="14px"/>
        </Info>
    </ListItem>
)

const UsersIndexItem = ({ url, user, ...props }) => (
    <ListItem {...props}>
        <Link to={`${url}/${user.id}`}>
            <Avatar url={user.avatar_url}>
                {!user.avatar_url && <span>{user.last_name.charAt(0)}</span>}
            </Avatar>
        </Link>
        <Info>
            <Link to={`${url}/${user.id}`}>
                <Title>{user.last_name}&nbsp;{user.first_name}</Title>
            </Link>
            <Meta>joined on…</Meta>
        </Info>
    </ListItem>
)

UsersIndexItem.propTypes = {
    user: PropTypes.object.isRequired,
    url:  PropTypes.string.isRequired,
}

export default UsersIndexItem
