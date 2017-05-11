import { connect }              from 'react-redux'
import { withRouter }           from 'react-router-dom'

import { createUpdateSelector } from '../../../core/selectors'
import Edit                     from '../components/EditSource'
import { updateSource }         from '../actions'


const updateSelector = createUpdateSelector('source')

const mapStateToProps = state => ({
    ...updateSelector(state),
})

const mapDispatchToProps = (dispatch, { source }) => ({
    update: data => {
        dispatch(updateSource(source.id, data))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit))
