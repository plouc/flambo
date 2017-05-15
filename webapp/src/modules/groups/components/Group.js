import React, { PropTypes } from 'react'
import { Switch, Route }    from 'react-router-dom'
import styled               from 'styled-components'
import FeedIcon             from 'react-icons/lib/md/featured-play-list'
import MembersIcon          from 'react-icons/lib/md/group'
import CommentsIcon         from 'react-icons/lib/md/chat'
import {
    FormattedMessage,
    FormattedRelative,
} from 'react-intl'

import Helmet               from '../../../core/components/HelmetIntl'
import { Label, Value }     from '../../../core/components/Grid'
import { Button }           from '../../../core/components/buttons'
import { Tabs, Tab }        from '../../../core/components/tabs'
import RelatedUser          from '../../users/components/RelatedUser'
import Edit                 from '../containers/EditGroupContainer'
import GroupMembership      from '../containers/GroupMembershipContainer'
import Feed                 from '../containers/GroupFeedContainer'
import Members              from '../containers/GroupMembersContainer'
import Comments             from '../containers/GroupCommentsContainer'
import Sources              from '../containers/GroupSourcesContainer'
import {
    Header,
    Title,
    Bar,
    Content,
    Sidebar,
    Picture,
} from '../../../core/components/info-page'


const Description = styled.div`
    font-size:     14px;
    margin-bottom: 12px;
`

const MembersCount = styled.span`
    margin-left: 9px;
    font-weight: 700;
`

const Group = ({ group, match }) => {
    return (
        <div>
            <Helmet
                title={group ? 'group_with_name' : 'group'}
                titleValues={group ? { group: group.name } : {}}
            />
            <Header>
                {group && <Picture url={group.picture_url}/>}
                {group && <Title>{group.name}</Title>}
            </Header>
            {group ? (
                <Bar>
                    <RelatedUser
                        user={group.owner}
                        messageId="group_created_by"
                        avatarUrlKey="avatar_url"
                    />
                    <Tabs>
                        <Tab
                            to={`${match.url}`}
                            label="group_feed"
                            icon={FeedIcon}
                            exact
                        />
                        <Tab
                            to={`${match.url}/comments`}
                            label="group_comments"
                            icon={CommentsIcon}
                        />
                        <Tab
                            to={`${match.url}/members`}
                            icon={MembersIcon}
                        >
                            <FormattedMessage id="group_members"/>
                            <MembersCount>
                                {group.members_count}
                            </MembersCount>
                        </Tab>
                    </Tabs>
                    <div>
                        <GroupMembership
                            group={group}
                            style={{ marginRight: 12 }}
                        />
                        {(group.viewer_is_owner || group.viewer_is_administrator) && (
                            <Button
                                label="edit"
                                to={`/groups/${group.id}/edit`}
                                primary
                                raised
                            />
                        )}
                    </div>
                </Bar>
            ) : <Bar/>}
            <Content>
                <Sidebar>
                    {group && (
                        <div>
                            {group.description && (
                                <Description>
                                    {group.description}
                                </Description>
                            )}
                            <Label>
                                <FormattedMessage id="created_at"/>
                            </Label>
                            <Value>
                                <FormattedRelative
                                    value={group.created_at}
                                    updateInterval={10000}
                                />
                            </Value>
                            <Label>
                                <FormattedMessage id="updated_at"/>
                            </Label>
                            <Value>
                                <FormattedRelative
                                    value={group.updated_at}
                                    updateInterval={10000}
                                />
                            </Value>
                        </div>
                    )}
                </Sidebar>
                <div style={{ overflow: 'visible' }}>
                    {group && (
                        <Switch>
                            <Route path={`${match.url}`} exact render={() => (
                                <Feed group={group}/>
                            )}/>
                            <Route path={`${match.url}/members`} render={() => (
                                <Members group={group}/>
                            )}/>
                            <Route path={`${match.url}/comments`} exact render={() => (
                                <Comments group={group}/>
                            )}/>
                            <Route path={`${match.url}/edit`} exact render={() => (
                                <Edit group={group}/>
                            )}/>
                        </Switch>
                    )}
                </div>
                <div>
                    {group && <Sources group={group}/>}
                </div>
            </Content>
        </div>
    )
}

Group.propTypes = {
    id:         PropTypes.string.isRequired,
    fetch:      PropTypes.func.isRequired,
    error:      PropTypes.object,
    group:      PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
}

export default Group
