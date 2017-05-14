import { connect }                    from 'react-redux'
import { withRouter }                 from 'react-router-dom'
import { compose, lifecycle }         from 'recompose'

import CollectionSubscribers          from '../components/CollectionSubscribers'
import { fetchCollectionSubscribers } from '../actions'


const mapStateToProps = ({ collectionsSubscribers: { byId } }, { collection }) => {
    const collectionSubscribers = byId[collection.id]

    let subscribers = []
    if (collectionSubscribers) {
        subscribers = collectionSubscribers.currentIds.map(id => {
            return collectionSubscribers.byId[id].data
        })
    }

    return {
        isFetching:     collectionSubscribers ? collectionSubscribers.isFetching : true,
        hasBeenFetched: collectionSubscribers ? !!collectionSubscribers.fetchedAt : false,
        subscribers,
    }
}

const mapDispatchToProps = (dispatch, { collection }) => ({
    fetch: () => {
        dispatch(fetchCollectionSubscribers(collection.id))
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
)(CollectionSubscribers)
