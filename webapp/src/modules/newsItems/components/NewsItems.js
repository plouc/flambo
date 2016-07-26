'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import classNames                      from 'classnames'
import NewsItemsListControls           from './NewsItemsListControls'
import NewsItemsList                   from './NewsItemsList'
import NewsItemsMonthStats             from './NewsItemsMonthStats'
import NewsItemsSourceTypeStats        from './NewsItemsSourceTypeStats'
import UserBadge                       from '../../users/containers/UserBadgeContainer'
import Loader                          from '../../core/components/Loader'


class NewsItems extends Component {
    componentWillMount() {
        const { fetchNewsItemsIfNeeded, fetchNewsItemsStats, page, limit, filters } = this.props
        fetchNewsItemsIfNeeded(page, limit, filters)
        fetchNewsItemsStats(filters)
    }

    render() {
        const {
            location: { query },
            page, limit, filters,
            isFetching,
            newsItems, total,
            onPageChange, onFiltersChange,
            monthsStats, sourceTypesStats,
        } = this.props

        const showExtraPane = query.stats && query.stats === 'on'

        return (
            <div>
                <div className={classNames('content')}>
                    <div className="fixed-header content-header">
                        <h1>
                            <FormattedMessage id="news_items" />
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link
                                to={{ pathname: '/news_items', query: { stats: 'on' } }}
                                className="button button--small button--action"
                            >
                                <span className="icon icon--pie-chart icon--push-right" />
                                <FormattedMessage id="news_items.stats" />
                            </Link>
                            <UserBadge />
                        </div>
                    </div>
                    <div className="content-with-fixed-header">
                        <NewsItemsListControls
                            page={page} limit={limit} filters={filters}
                            isFetching={isFetching}
                            newsItems={newsItems} total={total}
                            onFiltersChange={onFiltersChange}
                            onPageChange={onPageChange}
                        />
                        <NewsItemsList loading={isFetching} newsItems={newsItems}/>
                    </div>
                </div>
                {showExtraPane && (<Link className="overlay" to="/news_items" />)}
                <div className={classNames('extra-pane', { 'extra-pane--opened': showExtraPane })}>
                    <div className="fixed-header extra-pane__header">
                        <h2>
                            <FormattedMessage id="news_items.stats" />
                        </h2>
                    </div>
                    <div className="content-with-fixed-header">
                        <NewsItemsMonthStats
                            buckets={monthsStats}
                            filters={filters}
                            onChange={onFiltersChange}
                        />
                        <NewsItemsSourceTypeStats
                            buckets={sourceTypesStats}
                            filters={filters}
                            onChange={onFiltersChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

NewsItems.propTypes = {
    fetchNewsItemsIfNeeded: PropTypes.func.isRequired,
    fetchNewsItemsStats:    PropTypes.func.isRequired,
    newsItems:              PropTypes.array.isRequired,
    total:                  PropTypes.number.isRequired,
    page:                   PropTypes.number.isRequired,
    limit:                  PropTypes.number.isRequired,
    filters:                PropTypes.object.isRequired,
    isFetching:             PropTypes.bool.isRequired,
    monthsStats:            PropTypes.array.isRequired,
    sourceTypesStats:       PropTypes.array.isRequired,
    onPageChange:           PropTypes.func.isRequired,
    onFiltersChange:        PropTypes.func.isRequired,
}


export default NewsItems
