import React, { Component, PropTypes } from 'react'
import { Route, Switch }               from 'react-router-dom'
import styled                          from 'styled-components'
import FeedIcon                        from 'react-icons/lib/go/radio-tower'
import {
    FormattedMessage,
    FormattedRelative,
} from 'react-intl'

import Edit                            from '../containers/EditSourceContainer'
import { Label, Value }                from '../../../core/components/Grid'
import { Button }                      from '../../../core/components/buttons'
import RelatedUser                     from '../../users/components/RelatedUser'
import Feed                            from '../containers/SourceFeedContainer'
import Jobs                            from '../containers/SourceJobsContainer'
import typeInfos                       from './type-infos'
import { InfoPage }                    from '../../../core/components/info-page'


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

        let pageProps
        if (source) {
            const sidebar = (
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
            )

            const barInfo = (
                <RelatedUser
                    user={source.owner}
                    avatarUrlKey="avatar_url"
                    messageId="source_created_by"
                />
            )

            const controls = (
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
            )

            pageProps = {
                pageTitle:       'source_with_name',
                pageTitleValues: { source: source.name },
                pictureUrl:      source.picture_url,
                title:           source.name,
                aside:           React.createElement(typeInfos[source.type], { source }),
                tabs:            [
                    { label: 'source_feed', icon: FeedIcon, to: `${match.url}`, exact: true },
                    { label: 'source_jobs', to: `${match.url}/jobs` },
                ],
                barInfo,
                sidebar,
                controls,
            }
        } else {
            pageProps = {
                pageTitle: 'source',
            }
        }

        return (
            <InfoPage {...pageProps}>
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
            </InfoPage>
        )
    }
}
