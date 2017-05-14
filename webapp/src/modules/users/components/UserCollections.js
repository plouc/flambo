import React, { PropTypes }         from 'react'
import { Switch, Route, matchPath } from 'react-router-dom'
import styled                       from 'styled-components'

import { Button }                   from '../../../core/components/buttons'
import PublicCollections            from '../containers/UserPublicCollectionsContainer'
import CollectionsSubscriptions     from '../containers/UserCollectionsSubscriptionsContainer'


const Container = styled.div`
    background: white;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07);
`

const Header = styled.div`
    padding:       24px 24px 12px;
    //border-bottom: 1px solid #eee;
`

const UserCollections = ({
    user, match, location,
}) => {
    const isPublic = !!matchPath(location.pathname, {
        path:  match.url,
        exact: true,
    })

    const isSubscriptions = !!matchPath(location.pathname, {
        path: `${match.url}/subscriptions`,
    })

    return (
        <Container>
            <Header>
                <Button
                    to={match.url}
                    label="user_collections_public"
                    size="small"
                    primary={isPublic}
                />
                <Button
                    to={`${match.url}/subscriptions`}
                    label="user_collections_subscriptions"
                    size="small"
                    style={{ marginLeft: '12px' }}
                    primary={isSubscriptions}
                />
            </Header>
            <Switch>
                <Route path={match.url} exact render={() => (
                    <PublicCollections
                        user={user}
                        emptyMessageId="user_collections_public_none"
                    />
                )}/>
                <Route path={`${match.url}/subscriptions`} render={() => (
                    <CollectionsSubscriptions
                        user={user}
                        emptyMessageId="user_collections_subscriptions_none"
                    />
                )}/>
            </Switch>
        </Container>
    )
}

UserCollections.propTypes = {
    user:  PropTypes.object.isRequired,
    match: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }).isRequired,
}

export default UserCollections
