import { connect } from 'react-redux'
import Topic       from '../components/Topic'
import {
    fetchTopicIfNeeded,
    fetchTopicNewsItems,
} from '../actions/topicActions'


const mapStateToProps = ({ topicById, newsItemsByTopicId, locale }, props) => {
    const topicId   = props.params.id
    const topic     = topicById[topicId]
    const newsItems = newsItemsByTopicId[topicId]

    return {
        topicId,
        topic:               topic ? topic.topic : null,
        topicStatus:         topic ? topic.status : 0,
        topicIsFetching:     !topic || topic.isFetching,
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
    fetchTopicIfNeeded: id => {
        dispatch(fetchTopicIfNeeded(id))
    },
    fetchTopicNewsItems: (id, page, limit, filters) => {
        dispatch(fetchTopicNewsItems(id, page, limit, filters))
    }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topic)

