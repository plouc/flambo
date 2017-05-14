import { connect }                 from 'react-redux'
import { withRouter }              from 'react-router-dom'
import { compose, lifecycle }      from 'recompose'

import CollectionComments          from '../components/CollectionComments'
import {
    fetchCollectionComments,
    createCollectionComment,
} from '../actions'


const mapStateToProps = ({
    collectionsComments:     { byId },
    createCollectionComment: { isCreating },
    me:                      { data: me },
}, { collection }) => {
    const collectionComments = byId[collection.id]

    let comments = []
    if (collectionComments) {
        comments = collectionComments.currentIds.map(id => {
            return collectionComments.byId[id].data
        })
    }

    return {
        isFetching:     collectionComments ? collectionComments.isFetching : true,
        hasBeenFetched: collectionComments ? !!collectionComments.fetchedAt : false,
        comments,
        isCreating,
        me,
    }
}

const mapDispatchToProps = (dispatch, { collection }) => ({
    fetch: () => {
        dispatch(fetchCollectionComments(collection.id))
    },
    comment: data => {
        dispatch(createCollectionComment(collection.id, data))
    },
    onCancel: () => {
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
