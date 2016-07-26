'use strict'

import { connect }             from 'react-redux'
import EditSource              from '../components/EditSource'
import { fetchSourceIfNeeded } from '../actions/sourcesActions'


const mapStateToProps = ({ sourceById, locale }, props) => {
    const sourceId = props.params.id
    const source   = sourceById[sourceId]

    return {
        sourceId,
        source:  source ? source.source : null,
        loading: !source || source.isFetching,
        locale:  locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSourceIfNeeded: id => {
        dispatch(fetchSourceIfNeeded(id))
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditSource)

