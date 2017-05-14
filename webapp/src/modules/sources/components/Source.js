import React, { Component, PropTypes } from 'react'
import { Route, Switch }               from 'react-router-dom'
import styled                          from 'styled-components'
import FeedIcon                        from 'react-icons/lib/md/featured-play-list'
import {
    FormattedMessage,
    FormattedRelative,
} from 'react-intl'

import Helmet                          from '../../../core/components/HelmetIntl'
import Edit                            from '../containers/EditSourceContainer'
import { Tabs, Tab }                   from '../../../core/components/tabs'
import { Label, Value }                from '../../../core/components/Grid'
import { Button }                      from '../../../core/components/buttons'
import RelatedUser                     from '../../users/components/RelatedUser'
import Feed                            from '../containers/SourceFeedContainer'
import Jobs                            from '../containers/SourceJobsContainer'
import typeInfos                       from './type-infos'
import typeImages                      from './typeImages'
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

export default class Group extends Component {
    static propTypes = {
        id:         PropTypes.string.isRequired,
        fetch:      PropTypes.func.isRequired,
        error:      PropTypes.object,
        source:     PropTypes.object,
        isFetching: PropTypes.bool.isRequired,
    }

    componentDidMount() {
        this.props.fetch()
    }

    componentDidUpdate({ id }) {
        const { id: prevId, fetch } = this.props
        if (prevId !== id) fetch()
    }

    render() {
        const { source, match } = this.props

        return (
            <div>
                <Helmet
                    title={source ? 'source_with_name' : 'source'}
                    titleValues={source ? { source: source.name } : {}}
                />
                <Header>
                    {source && <Picture url={typeImages[source.type]}/>}
                    {source && <Title>{source.name}</Title>}
                </Header>
                {source ? (
                    <Bar>
                        <RelatedUser
                            user={source.owner}
                            avatarUrlKey="avatar_url"
                            messageId="source_created_by"
                        />
                        <Tabs>
                            <Tab
                                label="source_feed"
                                icon={FeedIcon}
                                to={`/sources/${source.id}`}
                                exact
                            />
                            <Tab
                                label="source_jobs"
                                to={`/sources/${source.id}/jobs`}
                            />
                        </Tabs>
                        <div>
                            <Button
                                label="load"
                                to={`/sources/${source.id}/load`}
                                primary
                            />
                            <Button
                                label="edit"
                                to={`/sources/${source.id}/edit`}
                                style={{ marginLeft: 12 }}
                                primary
                            />
                        </div>
                    </Bar>
                ) : <Bar/>}
                <Content>
                    <Sidebar>
                        {source && (
                            <div>
                                <Label>
                                    <FormattedMessage id="source_type"/>
                                </Label>
                                <Value>{source.type}</Value>
                                {source.description && (
                                    <Description>
                                        {source.description}
                                    </Description>
                                )}
                                <Label>
                                    <FormattedMessage id="created_at"/>
                                </Label>
                                <Value>
                                    <FormattedRelative
                                        value={source.created_at}
                                        updateInterval={10000}
                                    />
                                </Value>
                                <Label>
                                    <FormattedMessage id="updated_at"/>
                                </Label>
                                <Value>
                                    <FormattedRelative
                                        value={source.updated_at}
                                        updateInterval={10000}
                                    />
                                </Value>
                            </div>
                        )}
                    </Sidebar>
                    <div style={{ overflow: 'hidden' }}>
                        {source && (
                            <Switch>
                                <Route path={`${match.url}`} exact render={() => (
                                    <Feed source={source}/>
                                )}/>
                                <Route path={`${match.url}/jobs`} render={() => (
                                    <Jobs source={source}/>
                                )}/>
                                <Route path={`${match.url}/edit`} render={() => (
                                    <Edit source={source}/>
                                )}/>
                            </Switch>
                        )}
                    </div>
                    <div>
                        {source && React.createElement(typeInfos[source.type], { source })}
                    </div>
                </Content>
            </div>
        )
    }
}
