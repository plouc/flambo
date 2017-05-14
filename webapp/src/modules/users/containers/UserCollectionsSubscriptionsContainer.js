import { connect }                           from 'react-redux'
import { withRouter }                        from 'react-router-dom'
import { compose, lifecycle }                from 'recompose'

import UserCollections                       from '../components/UserCollectionsList'
import { fetchUserCollectionsSubscriptions } from '../actions'


const mapStateToProps = ({ usersCollectionsSubscriptions: { byId } }, { user }) => {
    const userCollectionsSubscriptions = byId[user.id]

    let collections = []
    if (userCollectionsSubscriptions) {
        collections = userCollectionsSubscriptions.currentIds.map(id => {
            return userCollectionsSubscriptions.byId[id].data
        })
    }

    return {
        isFetching:     userCollectionsSubscriptions ? userCollectionsSubscriptions.isFetching : true,
        hasBeenFetched: userCollectionsSubscriptions ? !!userCollectionsSubscriptions.fetchedAt : false,
        collections,
    }
}

const mapDispatchToProps = (dispatch, { user }) => ({
    fetch: () => {
        dispatch(fetchUserCollectionsSubscriptions(user.id))
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
