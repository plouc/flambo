'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import classNames                      from 'classnames'
import CollectionNotFound              from './CollectionNotFound'
import NewsItemsList                   from '../../newsItems/components/NewsItemsList'
import NewsItemsListControls           from '../../newsItems/components/NewsItemsListControls'
import NewsItemsMonthStats             from '../../newsItems/components/NewsItemsMonthStats'
import NewsItemsSourceTypeStats        from '../../newsItems/components/NewsItemsSourceTypeStats'
import UserBadge                       from '../../users/containers/UserBadgeContainer'
import Loader                          from '../../core/components/Loader'
import InternalError                   from '../../core/components/InternalError'


class Collection extends Component {
    componentWillMount() {
        const { fetchCollectionIfNeeded, fetchNewsItems, fetchNewsItemsStats } = this.props
        const { id }                                                           = this.props.params

        fetchCollectionIfNeeded(id)
        fetchNewsItems(id)
        fetchNewsItemsStats(id)
    }

    componentWillReceiveProps({ collectionId, fetchCollectionIfNeeded, fetchNewsItems, fetchNewsItemsStats }) {
        if (collectionId !== this.props.collectionId) {
            fetchCollectionIfNeeded(collectionId)
            fetchNewsItems(collectionId)
            fetchNewsItemsStats(collectionId)
        }
    }

    render() {
        const {
            location: { query },
            collectionId, collection, collectionStatus, collectionIsFetching,
            page, limit, filters, newsItems, total, newsItemsIsFetching,
            monthsStats, sourceTypesStats,
            onPageChange, onFiltersChange
        } = this.props

        const showExtraPane = query.stats && query.stats === 'on'

        if (collectionStatus === 404) {
            return <CollectionNotFound id={collectionId} />
        } else if (collectionStatus === 500) {
            return <InternalError />
        }

        return (
            <div className="content">
                <div className="fixed-header content-header">
                    <h1>{collectionIsFetching ? '' : collection.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="button-group">
                            <Link
                                to={{ pathname: `/collections/${collectionId}`, query: { stats: 'on' } }}
                                className="button button--small button--action"
                            >
                                <span className="icon icon--pie-chart icon--push-right" />
                                <FormattedMessage id="news_items.stats" />
                            </Link>
                        </span>
                        <UserBadge />
                    </div>
                    <Loader loading={collectionIsFetching} />
                </div>
                <div className="content-with-fixed-header">
                    <section className="section sub-header">
                        {!collectionIsFetching && (
                            <div>{collection.description}</div>
                        )}
                    </section>
                    <NewsItemsListControls
                        page={page} limit={limit} filters={filters}
                        isFetching={newsItemsIsFetching}
                        newsItems={newsItems} total={total}
                        onFiltersChange={onFiltersChange}
                        onPageChange={onPageChange}
                    />
                    <NewsItemsList loading={newsItemsIsFetching} newsItems={newsItems} />
                </div>
                {showExtraPane && (<Link className="overlay" to={`/collections/${collectionId}`} />)}
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

Collection.propTypes = {
    fetchCollectionIfNeeded: PropTypes.func.isRequired,
    fetchNewsItems:          PropTypes.func.isRequired,
    fetchNewsItemsStats:     PropTypes.func.isRequired,
    collection:              PropTypes.object,
    collectionStatus:        PropTypes.number.isRequired,
    collectionIsFetching:    PropTypes.bool.isRequired,
    newsItems:               PropTypes.array.isRequired,
    total:                   PropTypes.number.isRequired,
    page:                    PropTypes.number.isRequired,
    limit:                   PropTypes.number.isRequired,
    filters:                 PropTypes.object.isRequired,
    newsItemsIsFetching:     PropTypes.bool.isRequired,
    monthsStats:             PropTypes.array.isRequired,
    sourceTypesStats:        PropTypes.array.isRequired,
    onPageChange:            PropTypes.func.isRequired,
    onFiltersChange:         PropTypes.func.isRequired,
}


export default Collection
