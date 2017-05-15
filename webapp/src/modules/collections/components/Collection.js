import React, { PropTypes }   from 'react'
import styled                 from 'styled-components'
import { Switch, Route }      from 'react-router-dom'
import FeedIcon               from 'react-icons/lib/md/featured-play-list'
import DiscussionsIcon        from 'react-icons/lib/md/chat'
import SubscribersIcon        from 'react-icons/lib/md/group'
import {
    FormattedMessage,
    FormattedRelative,
} from 'react-intl'

import Helmet                 from '../../../core/components/HelmetIntl'
import CollectionSubscription from '../containers/CollectionSubscriptionContainer'
import { Label, Value }       from '../../../core/components/Grid'
import { Tabs, Tab }          from '../../../core/components/tabs'
import RelatedUser            from '../../users/components/RelatedUser'
import Feed                   from '../containers/CollectionFeedContainer'
import Comments               from '../containers/CollectionCommentsContainer'
import Subscribers            from '../containers/CollectionSubscribersContainer'
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

const SubscribersCount = styled.span`
    margin-left: 9px;
    font-weight: 700;
`

const Collection = ({
    collection,
}) => {
    return (
        <div>
            <Helmet
                title={collection ? 'collection_with_name' : 'collection'}
                titleValues={collection ? { collection: collection.name } : {}}
            />
            {collection && (
                <div>
                    <Header>
                        <Picture url={collection.picture_url}/>
                        {collection && <Title>{collection.name}</Title>}
                    </Header>
                    <Bar>
                        <RelatedUser
                            user={collection.owner}
                            avatarUrlKey="avatar_url"
                            messageId="collection_created_by"
                        />
                        <Tabs>
                            <Tab
                                label="collection_feed"
                                icon={FeedIcon}
                                to={`/collections/${collection.id}`}
                                exact
                            />
                            {collection.public && (
                                <Tab
                                    label="collection_comments"
                                    icon={DiscussionsIcon}
                                    to={`/collections/${collection.id}/comments`}
                                />
                            )}
                            {collection.public && (
                                <Tab
                                    to={`/collections/${collection.id}/subscribers`}
                                    icon={SubscribersIcon}
                                >
                                    <FormattedMessage id="collection_subscribers"/>
                                    <SubscribersCount>
                                        {collection.subscribers_count}
                                    </SubscribersCount>
                                </Tab>
                            )}
                        </Tabs>
                        <div>
                            {collection.public && (
                                <CollectionSubscription
                                    collection={collection}
                                    style={{ marginRight: 12 }}
                                />
                            )}
                        </div>
                    </Bar>
                    <Content>
                        <Sidebar>
                            {collection.description && (
                                <Description>
                                    {collection.description}
                                </Description>
                            )}
                            <Label>
                                <FormattedMessage id="created_at"/>
                            </Label>
                            <Value>
                                <FormattedRelative
                                    value={collection.created_at}
                                    updateInterval={10000}
                                />
                            </Value>
                            <Label>
                                <FormattedMessage id="updated_at"/>
                            </Label>
                            <Value>
                                <FormattedRelative
                                    value={collection.updated_at}
                                    updateInterval={10000}
                                />
                            </Value>
                        </Sidebar>
                        <div style={{ overflow: 'visible' }}>
                            {collection && (
                                <Switch>
                                    <Route path={`/collections/${collection.id}`} exact render={() => (
                                        <Feed collection={collection}/>
                                    )}/>
                                    {collection.public && (
                                        <Route path={`/collections/${collection.id}/comments`} render={() => (
                                            <Comments collection={collection}/>
                                        )}/>
                                    )}
                                    {collection.public && (
                                        <Route path={`/collections/${collection.id}/subscribers`} render={() => (
                                            <Subscribers collection={collection}/>
                                        )}/>
                                    )}
                                </Switch>
                            )}
                        </div>
                    </Content>
                </div>
            )}
        </div>
    )
}

Collection.propTypes = {
    error:      PropTypes.object,
    collection: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    isEditing:  PropTypes.bool.isRequired,
}

export default Collection
