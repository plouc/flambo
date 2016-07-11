import { connect } from 'react-redux'
import Sources     from '../components/Sources'
import {
    fetchSourcesIfNeeded,
} from '../actions/sourcesActions'


const mapStateToProps = ({ sources, locale }) => {
    return {
        sources:    sources.sources,
        isFetching: sources.isFetching,
        status:     sources.status,
        locale:     locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSourcesIfNeeded: () => {
        dispatch(fetchSourcesIfNeeded())
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sources)

