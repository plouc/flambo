import { connect }               from 'react-redux'
import { withRouter }            from 'react-router-dom'

import createCollectionSelector  from '../../../core/selectors/createCollectionSelector'
import Index                     from '../components/SourcesIndex'
import { fetchSourcesIfNeeded }  from '../actions'


const collectionSelector = createCollectionSelector('sources')

const mapStateToProps = state => {
    const {
        sources: {
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
        sources:          collectionSelector(state),
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
        dispatch(fetchSourcesIfNeeded(options))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Index))
