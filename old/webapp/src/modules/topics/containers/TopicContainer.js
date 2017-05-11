'use strict'

import { connect } from 'react-redux'
import Topic       from '../components/Topic'
import {
    fetchTopicIfNeeded,
    fetchTopicNewsItems,
    fetchTopicNewsItemsStats,
} from '../actions/topicsActions'


const mapStateToProps = ({
    topics: { byId },
    newsItemsByEntityId,
    newsItemsStatsByEntityId,
    locale
}, props) => {
    const topicId        = props.params.id
    const topic          = byId[topicId]
    const newsItems      = newsItemsByEntityId.topics ? newsItemsByEntityId.topics[topicId] : null
    const newsItemsStats = newsItemsStatsByEntityId.topics ? newsItemsStatsByEntityId.topics[topicId] : null

    return {
        topicId,
        topic:               topic ? topic.topic : null,
        topicError:          topic ? topic.error : null,
        topicLoading:        !topic || topic.loading,
        newsItems:           newsItems ? newsItems.newsItems : [],
        page:                newsItems ? newsItems.page : 1,
        limit:               newsItems ? newsItems.limit : 10,
        total:               newsItems ? newsItems.total : 0,
        filters:             newsItems ? newsItems.filters : {},
        newsItemsIsFetching: !newsItems || newsItems.isFetching,
        monthsStats:         newsItemsStats ? newsItemsStats.months : [],
        sourceTypesStats:    newsItemsStats ? newsItemsStats.sourceTypes : [],
        locale:              locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchTopicIfNeeded: id => {
        dispatch(fetchTopicIfNeeded(id))
    },
    fetchNewsItems: (id, page, limit, filters) => {
        dispatch(fetchTopicNewsItems(id, page, limit, filters))
    },
    fetchNewsItemsStats: (id, filters) => {
        dispatch(fetchTopicNewsItemsStats(id, filters))
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
)(Topic)

