'use strict'

import { connect } from 'react-redux'
import EditTopic   from '../components/EditTopic'
import {
    fetchTopicIfNeeded,
    uploadTopicPicture,
} from '../actions/topicsActions'

const mapStateToProps = ({ topics: { byId }, sources, locale }, props) => {
    const topicId = props.params.id
    const topic   = byId[topicId]

    return {
        topicId,
        topic:   topic ? topic.topic : null,
        loading: !topic || topic.loading,
        locale:  locale.locale,
        sources: sources.sources,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchTopicIfNeeded: id => {
        dispatch(fetchTopicIfNeeded(id))
    },
    uploadTopicPicture: (id, file) => {
        dispatch(uploadTopicPicture(id, file))
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTopic)

