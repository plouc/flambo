import { connect }              from 'react-redux'
import { withRouter }           from 'react-router-dom'

import { createUpdateSelector } from '../../../core/selectors'
import Edit                     from '../components/EditGroup'
import { updateGroup }          from '../actions'


const updateSelector = createUpdateSelector('group')

const mapStateToProps = state => ({
    ...updateSelector(state),
})

const mapDispatchToProps = (dispatch, { history, group }) => ({
    update: data => {
        dispatch(updateGroup(group.id, data))
    },
    cancel: () => {
        history.push(`/groups/${group.id}`)
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit))
