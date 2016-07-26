import { connect }         from 'react-redux'
import SourceCollectButton from '../components/SourceCollectButton'
import { collectSource }   from '../actions/sourcesActions'


const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(collectSource(ownProps.sourceId))
    }
})

export default connect(
    () => ({}),
    mapDispatchToProps
)(SourceCollectButton)