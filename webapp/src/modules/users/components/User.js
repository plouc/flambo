import React, { PropTypes } from 'react'
import { Switch, Route }    from 'react-router-dom'
import styled               from 'styled-components'
import FeedIcon             from 'react-icons/lib/go/radio-tower'
import CollectionsIcon      from 'react-icons/lib/md/folder-open'
import CommentsIcon         from 'react-icons/lib/go/comment-discussion'
import {
    FormattedMessage,
    FormattedRelative,
} from 'react-intl'

import { Label, Value }     from '../../../core/components/Grid'
import Feed                 from '../containers/UserFeedContainer'
import Comments             from '../containers/UserCommentsContainer'
import Collections          from '../containers/UserCollectionsContainer'
//import Groups               from './UserGroups'
import { InfoPage }          from '../../../core/components/info-page'


const Intro = styled.div`
    font-size:     14px;
    margin-bottom: 12px;
`

const User = ({ user, match }) => {
    
    let pageProps
    if (user) {
        const sidebar = (
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
        )

        pageProps = {
            pageTitle:       'user_with_name',
            pageTitleValues: { user: `${user.first_name} ${user.last_name}` },
            pictureUrl:      user.avatar_url,
            title:           `${user.last_name} ${user.first_name}`,
            tabs:            [
                { label: 'user_feed', icon: FeedIcon, to: `/users/${user.id}`, exact: true },
                { label: 'user_comments', icon: CommentsIcon, to: `/users/${user.id}/comments` },
                { label: 'user_collections', icon: CollectionsIcon, to: `/users/${user.id}/collections` },
            ],
            sidebar,
        }
    } else {
        pageProps = {
            pageTitle: 'user',
        }
    }

    /*
     <div>
     {user && <Groups groups={user.groups}/>}
     </div>
     */

    return (
        <InfoPage {...pageProps}>
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
        </InfoPage>
    )
}

User.propTypes = {
    id:         PropTypes.string.isRequired,
    error:      PropTypes.object,
    user:       PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
}

export default User
