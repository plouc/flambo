import React, { PropTypes } from 'react'
import { Link }             from 'react-router-dom'
import styled               from 'styled-components'
import MembersIcon          from 'react-icons/lib/md/group'
import {
    FormattedMessage,
    FormattedRelative,
} from 'react-intl'

import Loader               from '../../../core/components/Loader'


const Container = styled.div`
    background: white;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07);
    padding:    12px 24px;
    font-size:  14px;
    position:   relative;
    min-height: 260px;
`

const ListItem = styled.div`
    display:     flex;
    height:      72px;
    padding:     12px 0;
    align-items: flex-start;
    border-top:  1px solid #f3f4f8;
    
    &:first-child {
        border-width: 0;
    }
`

const Name = styled.span`
    font-weight:   500;
    color:         black;
`

const Avatar = styled.div`
    width:               48px;
    height:              48px;
    margin-right:        12px;
    background-size:     cover;
    background-color:    #fff;
    background-repeat:   no-repeat;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    border:              1px solid rgba(0, 0, 0, .1);
`

const Since = styled.div`
    font-size: 13px;
    color:     #666;
`

const Empty = styled.div`
    display:        flex;
    flex-direction: column;
    align-items:    center;
    color:          #ddd;
    margin-top:     24px;
`

const EmptyMessage = styled.div`
    color:      #777;
    margin-top: 36px;
    font-size:  14px;
`

const Admin = styled.span`
    display:       inline-block;
    margin-left:   9px;
    font-size:     12px;
    border-radius: 2px;
    border:        1px solid ${props => props.primaryColor};
    line-height:   1em;
    padding:       3px 6px;
    color:         ${props => props.primaryTextColor};
`

const GroupMembers = ({
    hasBeenFetched,
    isFetching,
    members,
}) => (
    <Container>
        {isFetching && <Loader/>}
        {hasBeenFetched && members.length === 0 && (
            <Empty>
                <MembersIcon size={96}/>
                <EmptyMessage>
                    <FormattedMessage id="group_members_none"/>
                </EmptyMessage>
            </Empty>
        )}
        <div>
            {members.map(member => (
                <ListItem key={member.id}>
                    <Link to={`/users/${member.id}`}>
                        <Avatar url={member.avatar ? member.avatar.url : null}/>
                    </Link>
                    <div>
                        <Link to={`/users/${member.id}`}>
                            <Name>{member.last_name} {member.first_name}</Name>
                            {member.is_administrator && <Admin>admin</Admin>}
                        </Link>
                        <Since>
                            <FormattedMessage
                                id="group_member_since"
                                values={{ since: (
                                    <FormattedRelative
                                        value={member.joined_at}
                                        updateInterval={10000}
                                    />
                                ) }}
                            />
                        </Since>
                    </div>
                </ListItem>
            ))}
        </div>
    </Container>
)

GroupMembers.propTypes = {
    hasBeenFetched: PropTypes.bool.isRequired,
    isFetching:     PropTypes.bool.isRequired,
    members:        PropTypes.array.isRequired,
}

export default GroupMembers
