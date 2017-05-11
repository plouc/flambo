import React    from 'react'
import { Link } from 'react-router-dom'
import styled   from 'styled-components'
import {
    FormattedMessage,
    FormattedRelative,
} from 'react-intl'


const Container = styled.div`
    background: white;
    boxShadow:  0 1px 2px rgba(0,0,0,0.07);
    padding:    12px 24px;
    font-size:  14px;
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

const Name = styled.div`
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

const GroupMembers = ({ members }) => (
    <Container>
        {members.map(member => (
            <ListItem key={member.id}>
                <Link to={`/users/${member.id}`}>
                    <Avatar url={member.avatar ? member.avatar.url : null}/>
                </Link>
                <div>
                    <Link to={`/users/${member.id}`}>
                        <Name>{member.last_name} {member.first_name}</Name>
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
    </Container>
)

export default GroupMembers
