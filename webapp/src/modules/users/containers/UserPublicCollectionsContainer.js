import { connect }                    from 'react-redux'
import { withRouter }                 from 'react-router-dom'
import { compose, lifecycle }         from 'recompose'

import UserCollections                from '../components/UserCollectionsList'
import { fetchUserPublicCollections } from '../actions'


const mapStateToProps = ({ usersPublicCollections: { byId } }, { user }) => {
    const userPublicCollections = byId[user.id]

    let collections = []
    if (userPublicCollections) {
        collections = userPublicCollections.currentIds.map(id => {
            return userPublicCollections.byId[id].data
        })
    }

    return {
        isFetching:     userPublicCollections ? userPublicCollections.isFetching : true,
        hasBeenFetched: userPublicCollections ? !!userPublicCollections.fetchedAt : false,
        collections,
    }
}

const mapDispatchToProps = (dispatch, { user }) => ({
    fetch: () => {
        dispatch(fetchUserPublicCollections(user.id))
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
