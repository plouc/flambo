import { connect }     from 'react-redux'
import AddToCollection from '../components/AddToCollection'
import {
    fetchCollectionsIfNeeded,
} from '../actions/collectionsActions'
import {
    addNewsItemToCollection,
    removeNewsItemFromCollection,
} from '../actions/collectionActions'


const mapStateToProps = ({ collections, locale }) => {
    return {
        collections: collections.collections,
        isFetching:  collections.isFetching,
        locale:      locale.locale,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsIfNeeded: () => {
        dispatch(fetchCollectionsIfNeeded())
    },
    addNewsItemToCollection: (id, newsItemId) => {
        dispatch(addNewsItemToCollection(id, newsItemId))
    },
    removeNewsItemFromCollection: (id, newsItemId) => {
        dispatch(removeNewsItemFromCollection(id, newsItemId))
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddToCollection)
