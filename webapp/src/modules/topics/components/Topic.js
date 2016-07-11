'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import TopicSources                    from './TopicSources'
import TopicNotFound                   from './TopicNotFound'
import NewsItemsList                   from '../../newsItems/components/NewsItemsList'
import NewsItemsFilters                from '../../newsItems/components/NewsItemsFilters'
import Loader                          from '../../core/components/Loader'
import Pager                           from '../../core/components/Pager'
import InternalError                   from '../../core/components/InternalError'
import { FETCH_STATUS_FAILURE }        from '../../core/constants/fetchStatuses'


class Topic extends Component {
    constructor(props) {
        super(props)

        this.handlerPagerUpdate  = this.handlerPagerUpdate.bind(this)
        this.handleFiltersUpdate = this.handleFiltersUpdate.bind(this)
    }

    componentWillMount() {
        const { fetchTopicIfNeeded, fetchTopicNewsItems } = this.props
        const { id }                                      = this.props.params

        fetchTopicIfNeeded(id)
        fetchTopicNewsItems(id)
    }

    componentWillReceiveProps({ topicId, fetchTopicIfNeeded, fetchTopicNewsItems }) {
        if (topicId !== this.props.topicId) {
            fetchTopicIfNeeded(topicId)
            fetchTopicNewsItems(topicId)
        }
    }

    handlerPagerUpdate(page, limit) {
        const { fetchTopicNewsItems, filters } = this.props
        const { id } = this.props.params

        fetchTopicNewsItems(id, page, limit, filters)
    }

    handleFiltersUpdate(filters) {
        const { fetchTopicNewsItems, page, limit } = this.props
        const { id } = this.props.params

        fetchTopicNewsItems(id, page, limit, filters)
    }

    render() {
        const { topicId, topic, topicStatus, topicIsFetching }                = this.props
        const { newsItems, total, page, limit, filters, newsItemsIsFetching } = this.props

        console.log('RENDER', this.props)

        if (topicStatus === 404) {
            return <TopicNotFound id={topicId} />
        } else if (topicStatus === FETCH_STATUS_FAILURE) {
            return <InternalError />
        }

        return (
            <div>
                <div className="content-header">
                    <h1>{topicIsFetching ? '' : topic.name}</h1>
                    <Link
                        to={`/topics/${topicId}/edit`}
                        className="button button--action button--small"
                    >
                        <FormattedMessage id="edit" />
                    </Link>
                    <Loader loading={topicIsFetching || newsItemsIsFetching} />
                </div>
                <div className="content-wrapper">
                    {!topicIsFetching && (
                        <section className="section">
                            <p>{topic.description}</p>
                            <TopicSources sources={topic.sources}/>
                        </section>
                    )}
                    <section className="section list-controls">
                        <NewsItemsFilters
                            filters={filters}
                            onChange={this.handleFiltersUpdate}
                        />
                        <Pager
                            page={page}
                            limit={limit}
                            count={newsItems.length}
                            total={total}
                            onChange={this.handlerPagerUpdate}
                        />
                    </section>
                    {!newsItemsIsFetching && (
                        <NewsItemsList newsItems={newsItems} />
                    )}
                </div>
            </div>
        )
    }
}

Topic.propTypes = {
    fetchTopicIfNeeded:  PropTypes.func.isRequired,
    fetchTopicNewsItems: PropTypes.func.isRequired,
    topic:               PropTypes.object,
    topicStatus:         PropTypes.number.isRequired,
    topicIsFetching:     PropTypes.bool.isRequired,
    newsItems:           PropTypes.array.isRequired,
    total:               PropTypes.number.isRequired,
    page:                PropTypes.number.isRequired,
    limit:               PropTypes.number.isRequired,
    newsItemsIsFetching: PropTypes.bool.isRequired,
}

Topic.defaultProps = {
    topicIsFetching:     true,
    newsItemsIsFetching: true,
}


export default Topic
