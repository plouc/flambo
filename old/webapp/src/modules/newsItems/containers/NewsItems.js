'use strict'

import { connect } from 'react-redux'
import NewsItems   from '../components/NewsItems'
import {
    fetchNewsItemsIfNeeded,
    fetchNewsItemsStats,
} from '../actions/newsItemsActions'


const mapStateToProps = ({ newsItems, newsItemsStats, locale }) => ({
    newsItems:        newsItems.newsItems,
    total:            newsItems.total,
    page:             newsItems.page,
    limit:            newsItems.limit,
    filters:          newsItems.filters,
    isFetching:       newsItems.isFetching,
    monthsStats:      newsItemsStats.months,
    sourceTypesStats: newsItemsStats.sourceTypes,
    locale:           locale.locale,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchNewsItemsIfNeeded: (page, limit, filters) => {
        dispatch(fetchNewsItemsIfNeeded(page, limit, filters))
    },
    fetchNewsItemsStats: filters => {
        dispatch(fetchNewsItemsStats(filters))
    },
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onPageChange: (page, limit) => {
        dispatchProps.fetchNewsItemsIfNeeded(page, limit, stateProps.filters)
    },
    onFiltersChange: filters => {
        dispatchProps.fetchNewsItemsIfNeeded(1, stateProps.limit, filters)
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(NewsItems)

