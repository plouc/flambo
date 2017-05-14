import { connect }                                 from 'react-redux'
import { withRouter }                              from 'react-router-dom'
import { injectIntl }                              from 'react-intl'


import Create                                      from '../components/CreateCollection'
import { createCollection, resetCreateCollection } from '../actions'


const mapStateToProps = state => {
    const { createCollection: { isCreating, error } } = state

    return {
        isCreating,
        error,
    }
}

const mapDispatchToProps = dispatch => ({
    create: data => {
        dispatch(createCollection(data))
    },
    reset: () => {
        dispatch(resetCreateCollection())
    },
})

export default withRouter(injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Create)))
