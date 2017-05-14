import { connect }                       from 'react-redux'
import { withRouter }                    from 'react-router-dom'
import { compose, lifecycle }            from 'recompose'

import Create                            from '../components/CreateGroup'
import { createGroup, resetCreateGroup } from '../actions'


const mapStateToProps = ({
    createGroup: { isCreating, error },
}) => ({
    isCreating, error,
})

const mapDispatchToProps = (dispatch, { history }) => ({
    create: data => {
        dispatch(createGroup(data))
    },
    reset: () => {
        dispatch(resetCreateGroup())
    },
    cancel: () => {
        history.push('/groups')
    },
})

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle({
        componentDidMount() {
            this.props.reset()
        }
    })
)(Create)