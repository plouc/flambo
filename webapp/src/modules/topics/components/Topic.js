'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import classNames                      from 'classnames'
import TopicNotFound                   from './TopicNotFound'
import TopicSubHeader                  from './TopicSubHeader'
import NewsItemsList                   from '../../newsItems/components/NewsItemsList'
import NewsItemsListControls           from '../../newsItems/components/NewsItemsListControls'
import NewsItemsMonthStats             from '../../newsItems/components/NewsItemsMonthStats'
import NewsItemsSourceTypeStats        from '../../newsItems/components/NewsItemsSourceTypeStats'
import Loader                          from '../../core/components/Loader'
import InternalError                   from '../../core/components/InternalError'
import { FETCH_STATUS_FAILURE }        from '../../core/constants/fetchStatuses'
import UserBadge                       from '../../users/containers/UserBadgeContainer'


class Topic extends Component {
    componentWillMount() {
        const { fetchTopicIfNeeded, fetchNewsItems, fetchNewsItemsStats } = this.props
        const { id }                                                      = this.props.params

        fetchTopicIfNeeded(id)
        fetchNewsItems(id)
        fetchNewsItemsStats(id)
    }

    componentWillReceiveProps({ topicId, fetchTopicIfNeeded, fetchNewsItems, fetchNewsItemsStats }) {
        if (topicId !== this.props.topicId) {
            fetchTopicIfNeeded(topicId)
            fetchNewsItems(topicId)
            fetchNewsItemsStats(topicId)
        }
    }

    render() {
        const {
            location: { query },
            topicId, topic, topicError, topicLoading,
            newsItems, total, page, limit, filters, newsItemsIsFetching,
            onPageChange, onFiltersChange,
            monthsStats, sourceTypesStats
        } = this.props

        const showExtraPane = query.stats && query.stats === 'on'

        if (topicError === 404) {
            return <TopicNotFound id={topicId} />
        } else if (topicError === FETCH_STATUS_FAILURE) {
            return <InternalError />
        }

        return (
            <div>
                <div className="content">
                    <div className="fixed-header content-header">
                        <h1>{topicLoading ? '' : topic.name}</h1>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="button-group">
                                <Link to={`/topics/${topicId}/edit`} className="button button--action">
                                    <FormattedMessage id="topic.settings" />
                                </Link>
                                <Link
                                    to={{ pathname: `/topics/${topicId}`, query: { stats: 'on' } }}
                                    className="button button--small button--action"
                                >
                                    <span className="icon icon--pie-chart icon--push-right" />
                                    <FormattedMessage id="news_items.stats" />
                                </Link>
                            </span>
                            <UserBadge />
                        </div>
                        <Loader loading={topicLoading} />
                    </div>
                    <div className="content-with-fixed-header">
                        <TopicSubHeader loading={topicLoading} topic={topic} />
                        <NewsItemsListControls
                            page={page} limit={limit} filters={filters}
                            isFetching={newsItemsIsFetching}
                            newsItems={newsItems} total={total}
                            onFiltersChange={onFiltersChange}
                            onPageChange={onPageChange}
                        />
                        <NewsItemsList loading={newsItemsIsFetching} newsItems={newsItems} />
                    </div>
                </div>
                {showExtraPane && (<Link className="overlay" to={`/topics/${topicId}`} />)}
                <div className={classNames('extra-pane', { 'extra-pane--opened': showExtraPane })}>
                    <div className="fixed-header extra-pane__header">
                        <h2>
                            <FormattedMessage id="news_items.stats" />
                        </h2>
                    </div>
                    <div className="content-with-fixed-header">
                        <NewsItemsMonthStats buckets={monthsStats} />
                        <NewsItemsSourceTypeStats
                            buckets={sourceTypesStats}
                            onChange={onFiltersChange}
                            filters={filters}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

Topic.propTypes = {
    fetchTopicIfNeeded:  PropTypes.func.isRequired,
    fetchNewsItems:      PropTypes.func.isRequired,
    fetchNewsItemsStats: PropTypes.func.isRequired,
    topic:               PropTypes.object,
    topicError:          PropTypes.any,
    topicLoading:        PropTypes.bool.isRequired,
    newsItems:           PropTypes.array.isRequired,
    total:               PropTypes.number.isRequired,
    page:                PropTypes.number.isRequired,
    limit:               PropTypes.number.isRequired,
    newsItemsIsFetching: PropTypes.bool.isRequired,
    monthsStats:         PropTypes.array.isRequired,
    sourceTypesStats:    PropTypes.array.isRequired,
    onPageChange:        PropTypes.func.isRequired,
    onFiltersChange:     PropTypes.func.isRequired,
}


export default Topic
