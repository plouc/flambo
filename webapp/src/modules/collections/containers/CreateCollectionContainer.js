import { connect }                       from 'react-redux'
import { withRouter }                    from 'react-router-dom'
import { injectIntl }                    from 'react-intl'


import Create                            from '../components/CreateGroup'
import { createGroup, resetCreateGroup } from '../actions'


const mapStateToProps = state => {
    const { createGroup: { isCreating, error } } = state

    return {
        isCreating,
        error,
    }
}

const mapDispatchToProps = dispatch => ({
    create: data => {
        dispatch(createGroup(data))
    },
    reset: () => {
        dispatch(resetCreateGroup())
    },
})

export default withRouter(injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Create)))
