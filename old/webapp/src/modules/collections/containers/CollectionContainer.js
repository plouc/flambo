'use strict'

import { connect } from 'react-redux'
import Collection  from '../components/Collection'
import {
    fetchCollectionIfNeeded,
    fetchCollectionNewsItems,
    fetchCollectionNewsItemsStats,
} from '../actions/collectionActions'


const mapStateToProps = ({ collectionById, newsItemsByEntityId, newsItemsStatsByEntityId, locale }, props) => {
    const collectionId   = props.params.id
    const collection     = collectionById[collectionId]
    const newsItems      = newsItemsByEntityId.collections ? newsItemsByEntityId.collections[collectionId] : null
    const newsItemsStats = newsItemsStatsByEntityId.collections ? newsItemsStatsByEntityId.collections[collectionId] : null

    return {
        collectionId,
        collection:           collection ? collection.collection : null,
        collectionStatus:     collection ? collection.status : 0,
        collectionIsFetching: !collection || collection.isFetching,
        newsItems:            newsItems ? newsItems.newsItems : [],
        page:                 newsItems ? newsItems.page : 1,
        limit:                newsItems ? newsItems.limit : 10,
        total:                newsItems ? newsItems.total : 0,
        filters:              newsItems ? newsItems.filters : {},
        newsItemsIsFetching:  !newsItems || newsItems.isFetching,
        monthsStats:          newsItemsStats ? newsItemsStats.months : [],
        sourceTypesStats:     newsItemsStats ? newsItemsStats.sourceTypes : [],
        locale:               locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchCollectionIfNeeded: id => {
        dispatch(fetchCollectionIfNeeded(id))
    },
    fetchNewsItems: (id, page, limit, filters) => {
        dispatch(fetchCollectionNewsItems(id, page, limit, filters))
    },
    fetchNewsItemsStats: (id, filters) => {
        dispatch(fetchCollectionNewsItemsStats(id, filters))
    },
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onPageChange: (page, limit) => {
        dispatchProps.fetchNewsItems(ownProps.params.id, page, limit, stateProps.filters)
    },
    onFiltersChange: filters => {
        dispatchProps.fetchNewsItems(ownProps.params.id, 1, stateProps.limit, filters)
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Collection)

