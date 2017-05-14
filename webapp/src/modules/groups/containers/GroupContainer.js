import { connect }            from 'react-redux'
import { withRouter }         from 'react-router-dom'
import { compose, lifecycle } from 'recompose'

import { createItemSelector } from '../../../core/selectors'
import Group                  from '../components/Group'
import { fetchGroupIfNeeded } from '../actions'


const itemSelector = createItemSelector('groups', 'group')

const mapStateToProps = (state, { match: { params } }) => {
    return {
        ...itemSelector({state, params}),
    }
}

const mapDispatchToProps = (dispatch, { match: { params: { id } } }) => ({
    fetch: () => {
        dispatch(fetchGroupIfNeeded(id))
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
)(Group)
