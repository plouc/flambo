import { connect }            from 'react-redux'
import { withRouter }         from 'react-router-dom'
import { compose, lifecycle } from 'recompose'

import { createItemSelector } from '../../../core/selectors'
import User                   from '../components/User'
import { fetchUserIfNeeded }  from '../actions'


const itemSelector = createItemSelector('users', 'user')

const mapStateToProps = (state, { match: { params } }) => ({
    ...itemSelector({ state, params }),
})

const mapDispatchToProps = (dispatch, { match: { params: { id } } }) => ({
    fetch: () => {
        dispatch(fetchUserIfNeeded(id))
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
            this.props.fetch()
        },
        componentDidUpdate({ id }) {
            const { id: prevId, fetch } = this.props
            if (prevId !== id) fetch()
        },
    })
)(User)
