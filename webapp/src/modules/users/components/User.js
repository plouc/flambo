import React, { PropTypes }     from 'react'
import { Switch, Route }        from 'react-router-dom'
import styled                   from 'styled-components'
import FeedIcon                 from 'react-icons/lib/md/featured-play-list'
import CollectionsIcon          from 'react-icons/lib/md/collections-bookmark'
import CommentsIcon             from 'react-icons/lib/md/chat'
import {
    FormattedMessage,
    FormattedRelative,
} from 'react-intl'

import { Label, Value }         from '../../../core/components/Grid'
import { Tabs, Tab }            from '../../../core/components/tabs'
import Helmet                   from '../../../core/components/HelmetIntl'
import Feed                     from '../containers/UserFeedContainer'
import Comments                 from '../containers/UserCommentsContainer'
import Collections              from '../containers/UserCollectionsContainer'
import Groups                   from './UserGroups'
import {
    Header,
    Title,
    Bar,
    Content,
    Sidebar,
    Picture,
} from '../../../core/components/info-page'


const Intro = styled.div`
    font-size:     14px;
    margin-bottom: 12px;
`

const User = ({
    user, match,
}) => (
    <div>
        <Helmet
            title={user ? 'user_with_name' : 'user'}
            titleValues={user ? { user: `${user.first_name} ${user.last_name}` } : {}}
        />
        <Header>
            {user && <Picture url={user.avatar_url}/>}
            {user && <Title>{user.last_name} {user.first_name}</Title>}
        </Header>
        <Bar>
            <span/>
            {user && (
                <Tabs>
                    <Tab
                        label="user_feed"
                        icon={FeedIcon}
                        to={`/users/${user.id}`}
                        exact
                    />
                    <Tab
                        label="user_comments"
                        icon={CommentsIcon}
                        to={`/users/${user.id}/comments`}
                    />
                    <Tab
                        label="user_collections"
                        icon={CollectionsIcon}
                        to={`/users/${user.id}/collections`}
                    />
                </Tabs>
            )}
        </Bar>
        <Content>
            <Sidebar>
                {user && (
                    <div>
                        {user.intro && <Intro>{user.intro}</Intro>}
                        <Label>
                            <FormattedMessage id="user_created_at"/>
                        </Label>
                        <Value>
                            <FormattedRelative
                                value={user.created_at}
                                updateInterval={10000}
                            />
                        </Value>
                        <Label>
                            <FormattedMessage id="user_updated_at"/>
                        </Label>
                        <Value>
                            <FormattedRelative
                                value={user.updated_at}
                                updateInterval={10000}
                            />
                        </Value>
                    </div>
                )}
            </Sidebar>
            <div style={{ overflow: 'hidden' }}>
                {user && (
                    <Switch>
                        <Route path={`${match.url}`} exact render={() => (
                            <Feed user={user}/>
                        )}/>
                        <Route path={`${match.url}/comments`} render={() => (
                            <Comments user={user}/>
                        )}/>
                        <Route path={`${match.url}/collections`} render={() => (
                            <Collections user={user}/>
                        )}/>
                    </Switch>
                )}
            </div>
            <div>
                {user && <Groups groups={user.groups}/>}
            </div>
        </Content>
    </div>
)

User.propTypes = {
    id:         PropTypes.string.isRequired,
    error:      PropTypes.object,
    user:       PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
}

export default User
