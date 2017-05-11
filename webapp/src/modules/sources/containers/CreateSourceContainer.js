import { connect }                             from 'react-redux'
import { withRouter }                          from 'react-router-dom'
import { injectIntl }                          from 'react-intl'


import CreatePosition                          from '../components/CreatePosition'
import { createPosition, resetCreatePosition } from '../actions'


const mapStateToProps = state => {
    const { createPosition: { isCreating, error } } = state

    return {
        isCreating,
        error,
    }
}

const mapDispatchToProps = dispatch => ({
    create: data => {
        dispatch(createPosition(data))
    },
    reset: () => {
        dispatch(resetCreatePosition())
    },
})

export default withRouter(injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePosition)))
