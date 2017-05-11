import { connect }            from 'react-redux'
import { withRouter }         from 'react-router-dom'
import { compose, lifecycle } from 'recompose'

import GroupComments          from '../components/GroupComments'
import { fetchGroupComments } from '../../comments/actions'


const mapStateToProps = ({ groupsComments: { byId } }, { group }) => {
    const groupComments = byId[group.id]

    let comments = []
    if (groupComments) {
        comments = groupComments.currentIds.map(id => {
            return groupComments.byId[id].data
        })
    }

    return {
        comments,
    }
}

const mapDispatchToProps = (dispatch, { group }) => ({
    fetchComments: () => {
        dispatch(fetchGroupComments(group.id))
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
            this.props.fetchComments()
        },
    })
)(GroupComments)
