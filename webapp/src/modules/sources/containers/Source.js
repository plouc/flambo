import { connect } from 'react-redux'
import Source      from '../components/Source'
import {
    fetchSourceIfNeeded,
    fetchSourceNewsItems,
} from '../actions/sourceActions'


const mapStateToProps = ({ locale, sourceById, newsItemsBySourceId }, props) => {
    const sourceId  = props.params.id
    const source    = sourceById[sourceId]
    const newsItems = newsItemsBySourceId[sourceId]

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
        locale:              locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSourceIfNeeded: id => {
        dispatch(fetchSourceIfNeeded(id))
    },
    fetchSourceNewsItems: (id, page, limit, filters) => {
        dispatch(fetchSourceNewsItems(id, page, limit, filters))
    }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Source)

