import { connect }              from 'react-redux'
import { withRouter }           from 'react-router-dom'
import { compose, lifecycle }   from 'recompose'

import UserCollections          from '../components/UserCollections'
import { fetchUserCollections } from '../actions'


const mapStateToProps = ({ usersCollections: { byId } }, { user }) => {
    const userCollections = byId[user.id]

    let collections = []
    if (userCollections) {
        collections = userCollections.currentIds.map(id => {
            return userCollections.byId[id].data
        })
    }

    console.log(collections)

    return {
        collections,
    }
}

const mapDispatchToProps = (dispatch, { user }) => ({
    fetch: () => {
        dispatch(fetchUserCollections(user.id))
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
)(UserCollections)
