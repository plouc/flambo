import { connect } from 'react-redux'
import Collection  from '../components/Collection'
import {
    fetchCollectionIfNeeded,
    fetchCollectionNewsItems,
} from '../actions/collectionActions'


const mapStateToProps = ({ collectionById, newsItemsByCollectionId, locale }, props) => {
    const collectionId = props.params.id
    const collection   = collectionById[collectionId]
    const newsItems    = newsItemsByCollectionId[collectionId]

    return {
        collectionId,
        collection:           collection ? collection.collection : null,
        collectionStatus:     collection ? collection.status : 0,
        collectionIsFetching: !collection || collection.isFetching,
        newsItems:            newsItems ? newsItems.newsItems : [],
        page:                 newsItems ? newsItems.page : 1,
        limit:                newsItems ? newsItems.limit : 10,
        total:                newsItems ? newsItems.total : 0,
        filters:              newsItems ? newsItems.filters : {},
        newsItemsIsFetching:  !newsItems || newsItems.isFetching,
        locale:               locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchCollectionIfNeeded: id => {
        dispatch(fetchCollectionIfNeeded(id))
    },
    fetchCollectionNewsItems: (id, page, limit, filters) => {
        dispatch(fetchCollectionNewsItems(id, page, limit, filters))
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Collection)

