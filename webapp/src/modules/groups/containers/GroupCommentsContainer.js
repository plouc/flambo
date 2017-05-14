import { connect }            from 'react-redux'
import { withRouter }         from 'react-router-dom'
import { compose, lifecycle } from 'recompose'

import GroupComments          from '../components/GroupComments'
import {
    fetchGroupComments,
    createGroupComment,
} from '../actions'


const mapStateToProps = ({
    groupsComments:     { byId },
    createGroupComment: { isCreating },
    me:                 { data: me },
}, { group }) => {
    const groupComments = byId[group.id]

    let comments = []
    if (groupComments) {
        comments = groupComments.currentIds.map(id => {
            return groupComments.byId[id].data
        })
    }

    return {
        isFetching:     groupComments ? groupComments.isFetching : true,
        hasBeenFetched: groupComments ? !!groupComments.fetchedAt : false,
        comments,
        isCreating,
        me,
    }
}

const mapDispatchToProps = (dispatch, { group }) => ({
    fetch: () => {
        dispatch(fetchGroupComments(group.id))
    },
    comment: data => {
        dispatch(createGroupComment(group.id, data))
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
)(GroupComments)
