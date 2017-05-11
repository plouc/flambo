import { connect }            from 'react-redux'
import { withRouter }         from 'react-router-dom'
import { compose, lifecycle } from 'recompose'

import GroupMembers           from '../components/GroupMembers'
import { fetchGroupMembers }  from '../actions'


const mapStateToProps = ({ groupsMembers: { byId } }, { group }) => {
    const groupMembers = byId[group.id]

    let members = []
    if (groupMembers) {
        members = groupMembers.currentIds.map(id => {
            return groupMembers.byId[id].data
        })
    }

    return {
        members,
    }
}

const mapDispatchToProps = (dispatch, { group }) => ({
    fetch: () => {
        dispatch(fetchGroupMembers(group.id))
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
    })
)(GroupMembers)
