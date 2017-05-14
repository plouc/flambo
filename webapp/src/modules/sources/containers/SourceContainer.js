import { connect }             from 'react-redux'
import { withRouter }          from 'react-router-dom'

import { createItemSelector }  from '../../../core/selectors'
import Source                  from '../components/Source'
import {
    fetchSourceIfNeeded,
    loadSource,
} from '../actions'


const itemSelector = createItemSelector('sources', 'source')

const mapStateToProps = (state, { match: { params } }) => ({
    ...itemSelector({ state, params }),
})

const mapDispatchToProps = (dispatch, { match: { params: { id } } }) => ({
    fetch: () => {
        dispatch(fetchSourceIfNeeded(id))
    },
    load: () => {
        dispatch(loadSource(id))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Source))
