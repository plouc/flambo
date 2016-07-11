import { connect } from 'react-redux'
import Topics      from '../components/Topics'
import {
    fetchTopicsIfNeeded,
} from '../actions/topicsActions'


const mapStateToProps = ({ topics, locale }) => {
    return {
        topics:     topics.topics,
        isFetching: topics.isFetching,
        status:     topics.status,
        locale:     locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchTopicsIfNeeded: () => {
        dispatch(fetchTopicsIfNeeded())
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topics)

