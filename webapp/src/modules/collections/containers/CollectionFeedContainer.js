import { connect }             from 'react-redux'
import { withRouter }          from 'react-router-dom'
import { compose, lifecycle }  from 'recompose'

import CollectionFeed          from '../components/CollectionFeed'
import { fetchCollectionFeed } from '../actions'


const mapStateToProps = ({ collectionsFeed: { byId } }, { collection }) => {
    const collectionFeed = byId[collection.id]

    let items = []
    if (collectionFeed) {
        items = collectionFeed.currentIds.map(id => {
            return collectionFeed.byId[id].data
        })
    }

    return {
        isFetching:     collectionFeed ? collectionFeed.isFetching : true,
        hasBeenFetched: collectionFeed ? !!collectionFeed.fetchedAt : false,
        items,
    }
}

const mapDispatchToProps = (dispatch, { collection }) => ({
    fetch: () => {
        dispatch(fetchCollectionFeed(collection.id))
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
)(CollectionFeed)
