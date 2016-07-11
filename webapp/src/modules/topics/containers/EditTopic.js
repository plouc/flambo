import { connect } from 'react-redux'
import EditTopic   from '../components/EditTopic'
import {
    fetchTopicIfNeeded,
    updateTopic,
    uploadTopicPicture,
} from '../actions/topicActions'


const mapStateToProps = (state, props) => {
    const { topicById, locale } = state

    return {
        ...topicById[props.params.id],
        locale: locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchTopicIfNeeded: id => {
        dispatch(fetchTopicIfNeeded(id))
    },
    updateTopic: (id, topic) => {
        dispatch(updateTopic(id, topic))
    },
    uploadTopicPicture: (id, file) => {
        dispatch(uploadTopicPicture(id, file))
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTopic)

