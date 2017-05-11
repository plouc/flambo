import { connect }                 from 'react-redux'
import { withRouter }              from 'react-router-dom'
import { compose, lifecycle }      from 'recompose'

import CollectionComments          from '../components/CollectionComments'
import { fetchCollectionComments } from '../actions'


const mapStateToProps = ({ collectionsComments: { byId } }, { collection }) => {
    const collectionComments = byId[collection.id]

    let comments = []
    if (collectionComments) {
        comments = collectionComments.currentIds.map(id => {
            return collectionComments.byId[id].data
        })
    }

    return {
        comments,
    }
}

const mapDispatchToProps = (dispatch, { collection }) => ({
    fetch: () => {
        dispatch(fetchCollectionComments(collection.id))
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
)(CollectionComments)
