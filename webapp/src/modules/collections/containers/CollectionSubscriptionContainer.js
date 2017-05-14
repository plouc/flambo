import { connect }            from 'react-redux'
import { compose }            from 'recompose'

import CollectionSubscription from '../components/CollectionSubscription'
import {
    subscribeToCollection,
    unsubscribeFromCollection,
} from '../actions'


const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch, { collection }) => ({
    subscribe: () => {
        dispatch(subscribeToCollection(collection))
    },
    unsubscribe: () => {
        dispatch(unsubscribeFromCollection(collection))
    },
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(CollectionSubscription)
