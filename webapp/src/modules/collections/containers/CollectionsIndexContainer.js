import { connect }                  from 'react-redux'
import { withRouter }               from 'react-router-dom'

import createCollectionSelector     from '../../../core/selectors/createCollectionSelector'
import Index                        from '../components/CollectionsIndex'
import { fetchCollectionsIfNeeded } from '../actions'


const collectionSelector = createCollectionSelector('collections')

const mapStateToProps = state => {
    const {
        collections: {
            fetchedAt,
            isFetching,
            perPage,
            page,
            sort,
            filters,
            hasNextPage,
            error,
        },
    } = state

    return {
        hasBeenFetched:   !!fetchedAt,
        //hasActiveFilters: hasActiveFiltersSelector(state),
        hasActiveFilters: false,
        collections:      collectionSelector(state),
        isFetching,
        perPage,
        page,
        sort,
        hasNextPage,
        filters,
        error,
    }
}

const mapDispatchToProps = dispatch => ({
    fetch: options => {
        dispatch(fetchCollectionsIfNeeded(options))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Index))
