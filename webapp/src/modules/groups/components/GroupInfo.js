import React, { Component, PropTypes }         from 'react'
import { FormattedMessage, FormattedRelative } from 'react-intl'
import { Switch, Route, Redirect }             from 'react-router-dom'
import styled                                  from 'styled-components'

import { Label, Value }                        from '../../../core/components/Grid'
import { Button }                              from '../../../core/components/buttons'
import RelatedUser                             from '../../users/components/RelatedUser'
import GroupMembership                         from '../containers/GroupMembershipContainer'
import { Header, Title, Bar, Content, Sidebar, Picture } from '../../../core/components/info-page'
import GroupComments from '../containers/GroupCommentsContainer'


const NewsFeed = styled.div`
    background-color: #fff;
    box-shadow:       0 1px 2px rgba(0, 0, 0, .07);
    border-radius:    3px;
`

const Aside = styled.div`
    background-color: #e89a16;
`

const Description = styled.div`
    font-size:     14px;
    margin-bottom: 12px;
`

const Tabs = styled.div`
    display:     flex;
    height:      100%;
`

const Tab = styled.div`
    text-transform: uppercase;
    padding:        0 12px;
    font-size:      13px;
    border-bottom:  4px solid ${props => props.theme.primaryColor};
    padding-top:    26px;
    font-weight:    500;
    cursor:         pointer;
`

export default class GroupInfo extends Component {
    static propTypes = {
        group: PropTypes.object.isRequired,
    }

    render() {
        const { group } = this.props

        return (
            <Content>
                <NewsFeed>
                    <Switch>
                        <Route
                            path={`/groups/${group.id}/discussions`}
                            render={() => (
                                <GroupComments group={group}/>
                            )}
                        />
                    </Switch>
                </NewsFeed>
                <Aside>
                    Aside
                </Aside>
            </Content>
        )
    }
}
