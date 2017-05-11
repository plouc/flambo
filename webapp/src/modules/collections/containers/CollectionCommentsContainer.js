import { connect }            from 'react-redux'
import { withRouter }         from 'react-router-dom'
import { compose, lifecycle } from 'recompose'

import UserComments           from '../components/UserComments'
import { fetchUserComments }  from '../actions'


const mapStateToProps = ({ usersComments: { byId } }, { user }) => {
    const userComments = byId[user.id]

    let comments = []
    if (userComments) {
        comments = userComments.currentIds.map(id => {
            return userComments.byId[id].data
        })
    }

    return {
        comments,
    }
}

const mapDispatchToProps = (dispatch, { user }) => ({
    fetch: () => {
        dispatch(fetchUserComments(user.id))
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
)(UserComments)
