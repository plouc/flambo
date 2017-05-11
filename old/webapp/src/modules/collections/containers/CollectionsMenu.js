import { connect }     from 'react-redux'
import CollectionsMenu from '../components/CollectionsMenu'
import {
    fetchCollectionsIfNeeded,
} from '../actions/collectionsActions'


const mapStateToProps = ({ collections, locale, routing: { locationBeforeTransitions: { pathname }} }) => {
    let collectionId = null
    if (pathname.includes('/collections/')) {
        collectionId = pathname.split('/')[2]
    }

    return {
        collectionId, // this one is used only to make sure Links active state updates correctly
        collections: collections.collections,
        isFetching:  collections.isFetching,
        status:      collections.status,
        locale:      locale.locale,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsIfNeeded: () => {
        dispatch(fetchCollectionsIfNeeded())
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CollectionsMenu)
