import React, { PropTypes } from 'react'
import { Link }             from 'react-router-dom'
import styled               from 'styled-components'
//import { FormattedMessage } from 'react-intl'

import { Name }             from '../../../core/components/card'
import Placeholder          from '../../../core/components/Placeholder'


const ListItem = styled.div`
    display:     flex;
    padding:     12px 24px;
    align-items: flex-start;
    border-top:  1px solid #f3f4f8;
    background-color: #FFF;
    
    &:first-child {
        border-width: 0;
    }
`

const Avatar = styled.div`
    width:               60px;
    height:              60px;
    margin-right:        24px;
    background-color:    #f3f4f8;
    background-repeat:   no-repeat;
    background-size:     cover;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    border:              1px solid rgba(0, 0, 0, .1);
`

const Info = styled.div`
    display:        flex;
    flex-direction: column;
`

export const UsersIndexLoadingItem = props => (
    <ListItem {...props}>
        <Placeholder
            width="60px" height="60px"
            style={{ marginRight: '24px' }}
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
            <Avatar url={user.avatar_url}/>
        </Link>
        <Info>
            <Link to={`${url}/${user.id}`}>
                <Name>{user.last_name}&nbsp;{user.first_name}</Name>
            </Link>
        </Info>
    </ListItem>
)

UsersIndexItem.propTypes = {
    user: PropTypes.object.isRequired,
    url:  PropTypes.string.isRequired,
}

export default UsersIndexItem
