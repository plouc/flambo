import { connect }                         from 'react-redux'
import { withRouter }                      from 'react-router-dom'
import { injectIntl }                      from 'react-intl'


import Create                              from '../components/CreateSource'
import { createSource, resetCreateSource } from '../actions'


const mapStateToProps = state => {
    const { createSource: { isCreating, error } } = state

    return {
        isCreating,
        error,
    }
}

const mapDispatchToProps = dispatch => ({
    create: data => {
        dispatch(createSource(data))
    },
    reset: () => {
        dispatch(resetCreateSource())
    },
})

export default withRouter(injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Create)))
