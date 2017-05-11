import { connect } from 'react-redux'
import Source      from '../components/Source'
import {
    fetchSourceIfNeeded,
    fetchSourceNewsItems,
    fetchSourceNewsItemsStats
} from '../actions/sourcesActions'


const mapStateToProps = ({ locale, sourceById, newsItemsByEntityId, newsItemsStatsByEntityId }, props) => {
    const sourceId       = props.params.id
    const source         = sourceById[sourceId]
    const newsItems      = newsItemsByEntityId.sources ? newsItemsByEntityId.sources[sourceId] : null
    const newsItemsStats = newsItemsStatsByEntityId.sources ? newsItemsStatsByEntityId.sources[sourceId] : null

    return {
        sourceId,
        source:              source ? source.source : null,
        sourceStatus:        source ? source.status : 0,
        sourceIsFetching:    !source || source.isFetching,
        newsItems:           newsItems ? newsItems.newsItems : [],
        page:                newsItems ? newsItems.page : 1,
        limit:               newsItems ? newsItems.limit : 10,
        total:               newsItems ? newsItems.total : 0,
        filters:             newsItems ? newsItems.filters : {},
        newsItemsIsFetching: !newsItems || newsItems.isFetching,
        monthsStats:         newsItemsStats ? newsItemsStats.months : [],
        locale:              locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSourceIfNeeded: id => {
        dispatch(fetchSourceIfNeeded(id))
    },
    fetchNewsItems: (id, page, limit, filters) => {
        dispatch(fetchSourceNewsItems(id, page, limit, filters))
    },
    fetchNewsItemsStats: (id, filters) => {
        dispatch(fetchSourceNewsItemsStats(id, filters))
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
)(Source)

