import React, { PropTypes } from 'react'
import { Switch, Route }    from 'react-router-dom'
import styled               from 'styled-components'
import FeedIcon             from 'react-icons/lib/go/radio-tower'
import MembersIcon          from 'react-icons/lib/md/group'
import CommentsIcon         from 'react-icons/lib/go/comment-discussion'
import {
    FormattedMessage,
    FormattedRelative,
} from 'react-intl'

import { Label, Value }     from '../../../core/components/Grid'
import { Button }           from '../../../core/components/buttons'
import RelatedUser          from '../../users/components/RelatedUser'
import Edit                 from '../containers/EditGroupContainer'
import GroupMembership      from '../containers/GroupMembershipContainer'
import Feed                 from '../containers/GroupFeedContainer'
import Members              from '../containers/GroupMembersContainer'
import Comments             from '../containers/GroupCommentsContainer'
import Sources              from '../containers/GroupSourcesContainer'
import { InfoPage }         from '../../../core/components/info-page'


const Description = styled.div`
    font-size:     14px;
    margin-bottom: 12px;
`

/*
@todo need to be re-integrated
const MembersCount = styled.span`
    margin-left: 9px;
    font-weight: 700;
`
<MembersCount>
    {group.members_count}
</MembersCount>
 */

const Group = ({ group, match }) => {
    let pageProps
    if (group) {
        const sidebar = (
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
        )

        const barInfo = (
            <RelatedUser
                user={group.owner}
                messageId="group_created_by"
                avatarUrlKey="avatar_url"
            />
        )

        const controls = (
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
        )

        pageProps = {
            pageTitle:       'group_with_name',
            pageTitleValues: { group: group.name },
            pictureUrl:      group.picture_url,
            title:           group.name,
            aside:           <Sources group={group}/>,
            tabs:            [
                { label: 'group_feed', icon: FeedIcon, to: match.url, exact: true },
                { label: 'group_comments', icon: CommentsIcon, to: `${match.url}/comments` },
                { label: 'group_members', icon: MembersIcon, to: `${match.url}/members` },
            ],
            sidebar,
            controls,
            barInfo,
        }
    } else {
        pageProps = {
            pageTitle: 'group',
        }
    }

    return (
        <InfoPage {...pageProps}>
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
        </InfoPage>
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
