import { connect } from 'react-redux'
import EditSource  from '../components/EditSource'
import {
    fetchSourceIfNeeded,
    updateSource,
} from '../actions/sourceActions'
import {
    fetchTopicsIfNeeded,
} from '../../topics/actions/topicsActions'


const mapStateToProps = (state, props) => {
    const { sourceById, topics, locale } = state

    const source = sourceById[props.params.id]

    return {
        source:     source ? source.source : null,
        topics:     topics.topics,
        isFetching: !source || source.isFetching || topics.isFetching,
        locale:     locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSourceIfNeeded: id => {
        dispatch(fetchSourceIfNeeded(id))
    },
    fetchTopicsIfNeeded: () => {
        dispatch(fetchTopicsIfNeeded())
    },
    updateSource: (id, source) => {
        dispatch(updateSource(id, source))
    }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditSource)

