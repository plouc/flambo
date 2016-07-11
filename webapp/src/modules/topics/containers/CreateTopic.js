import { connect } from 'react-redux'
import CreateTopic from '../components/CreateTopic'
import {
    createTopic,
} from '../actions/topicActions'


const mapStateToProps = ({ locale }) => {
    return {
        locale: locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    createTopic: topic => {
        dispatch(createTopic(topic))
    }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateTopic)
