'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import classNames                      from 'classnames'
import SourceNotFound                  from './SourceNotFound'
import SourceSubHeader                 from './SourceSubHeader'
import SourceCollectButton             from '../containers/SourceCollectButton'
import NewsItemsList                   from '../../newsItems/components/NewsItemsList'
import NewsItemsListControls           from '../../newsItems/components/NewsItemsListControls'
import NewsItemsMonthStats             from '../../newsItems/components/NewsItemsMonthStats'
import Loader                          from '../../core/components/Loader'
import InternalError                   from '../../core/components/InternalError'
import { FETCH_STATUS_FAILURE }        from '../../core/constants/fetchStatuses'


class Source extends Component {
    componentWillMount() {
        const { fetchSourceIfNeeded, fetchNewsItems, fetchNewsItemsStats } = this.props
        const { id } = this.props.params

        fetchSourceIfNeeded(id)
        fetchNewsItems(id)
        fetchNewsItemsStats(id)
    }

    componentWillReceiveProps({ sourceId, fetchSourceIfNeeded, fetchNewsItems, fetchNewsItemsStats }) {
        if (sourceId !== this.props.sourceId) {
            fetchSourceIfNeeded(sourceId)
            fetchNewsItems(sourceId)
            fetchNewsItemsStats(sourceId)
        }
    }

    render() {
        const {
            location: { query },
            sourceId, source, sourceStatus, sourceIsFetching,
            page, limit, filters, newsItems, total, newsItemsIsFetching,
            monthsStats,
            onPageChange, onFiltersChange,
        } = this.props

        const showExtraPane = query.stats && query.stats === 'on'

        if (sourceStatus === 404) {
            return <SourceNotFound id={sourceId} />
        } else if (sourceStatus === FETCH_STATUS_FAILURE) {
            return <InternalError />
        }

        return (
            <div>
                <div className="content">
                    <div className="fixed-header content-header">
                        <h1>{sourceIsFetching ? '' : source.name}</h1>
                        <span className="button-group">
                            <Link
                                to={`/sources/${sourceId}/edit`}
                                className="button button--action"
                            >
                                <FormattedMessage id="source.settings" />
                            </Link>
                            <SourceCollectButton
                                sourceId={sourceId}
                                className="button--action button--small"
                            />
                            <Link
                                to={{ pathname: `/sources/${sourceId}`, query: { stats: 'on' } }}
                                className="button button--small button--action"
                            >
                                <span className="icon icon--pie-chart icon--push-right" />
                                <FormattedMessage id="news_items.stats" />
                            </Link>
                        </span>
                        <Loader loading={sourceIsFetching} />
                    </div>
                    <div className="content-with-fixed-header">
                        <SourceSubHeader isFetching={sourceIsFetching} source={source} />
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
                {showExtraPane && (<Link className="overlay" to={`/sources/${sourceId}`} />)}
                <div className={classNames('extra-pane', { 'extra-pane--opened': showExtraPane })}>
                    <div className="fixed-header extra-pane__header">
                        <h2>
                            <FormattedMessage id="news_items.stats" />
                        </h2>
                    </div>
                    <div className="content-with-fixed-header">
                        <NewsItemsMonthStats
                            buckets={monthsStats}
                            onChange={onFiltersChange}
                            filters={filters}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

Source.propTypes = {
    fetchSourceIfNeeded: PropTypes.func.isRequired,
    fetchNewsItems:      PropTypes.func.isRequired,
    fetchNewsItemsStats: PropTypes.func.isRequired,
    source:              PropTypes.object,
    sourceStatus:        PropTypes.number.isRequired,
    sourceIsFetching:    PropTypes.bool.isRequired,
    newsItems:           PropTypes.array.isRequired,
    total:               PropTypes.number.isRequired,
    page:                PropTypes.number.isRequired,
    limit:               PropTypes.number.isRequired,
    newsItemsIsFetching: PropTypes.bool.isRequired,
    monthsStats:         PropTypes.array.isRequired,
    onPageChange:        PropTypes.func.isRequired,
    onFiltersChange:     PropTypes.func.isRequired,
}


export default Source
