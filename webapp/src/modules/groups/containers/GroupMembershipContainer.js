import { connect }               from 'react-redux'
import { compose }               from 'recompose'

import GroupMembership           from '../components/GroupMembership'
import { joinGroup, leaveGroup } from '../actions'


const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, { group }) => ({
    join: () => {
        dispatch(joinGroup(group))
    },
    leave: () => {
        dispatch(leaveGroup(group))
    },
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(GroupMembership)
