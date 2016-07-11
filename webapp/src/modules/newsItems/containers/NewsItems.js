import { connect } from 'react-redux'
import NewsItems   from '../components/NewsItems'
import {
    fetchNewsItemsIfNeeded,
} from '../actions/newsItemsActions'


const mapStateToProps = ({ newsItems, locale }) => ({
    newsItems:  newsItems.newsItems,
    total:      newsItems.total,
    page:       newsItems.page,
    limit:      newsItems.limit,
    filters:    newsItems.filters,
    isFetching: newsItems.isFetching,
    locale:     locale.locale,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchNewsItemsIfNeeded: (page, limit, filters) => {
        dispatch(fetchNewsItemsIfNeeded(page, limit, filters))
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsItems)

