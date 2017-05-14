import React, { Component, PropTypes }         from 'react'
import { FormattedMessage, FormattedRelative } from 'react-intl'
import styled                                  from 'styled-components'
import { Link }                                from 'react-router-dom'

import CommentsList                            from '../../comments/components/CommentsList'
import { Header, Title, Bar, Content, Sidebar, Picture } from '../../../core/components/info-page'


const NewsFeed = styled.div`
    background-color: #fff;
    box-shadow:       0 1px 2px rgba(0, 0, 0, .07);
    border-radius:    3px;
`

const Aside = styled.div`
`

const Groups = styled.div`
    background-color: #fff;
    box-shadow:       0 1px 2px rgba(0, 0, 0, .07);
    padding-bottom:   6px;
`

const GroupsTitle = styled.div`
    padding:        12px 12px 6px;
    font-weight:    500;
    text-transform: uppercase;
    font-size:      14px;
`

const Group = styled.div`
    font-size:   14px;
    padding:     6px 12px;
    display:     flex;
    align-items: center;
    
    &:hover {
        font-weight: 500;
        color:       #000;
    }
`

const GroupPicture = styled.div`
    width:               36px;
    height:              36px;
    background:          black;
    margin-right:        12px;
    background-size:     cover;
    background-color:    #fff;
    background-repeat:   no-repeat;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    border:              1px solid rgba(0, 0, 0, .1);
`

export default class UserInfo extends Component {
    static propTypes = {
        user: PropTypes.object,
    }

    render() {
        const { user } = this.props

        return (
            <Groups>
                <GroupsTitle>
                    <FormattedMessage id="groups"/>
                </GroupsTitle>
                {user.groups.map(group => (
                    <Link key={group.id} to={`/groups/${group.id}`}>
                        <Group>
                            <GroupPicture url={group.picture_url}/>
                            {group.name}
                        </Group>
                    </Link>
                ))}
            </Groups>
        )
    }
}
