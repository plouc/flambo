import { connect }               from 'react-redux'
import { withRouter }            from 'react-router-dom'

import createCollectionSelector  from '../../../core/selectors/createCollectionSelector'
import Index                     from '../components/GroupsIndex'
import { fetchGroupsIfNeeded }   from '../actions'


const collectionSelector = createCollectionSelector('groups')

const mapStateToProps = state => {
    const {
        groups: {
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
        groups:           collectionSelector(state),
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
        dispatch(fetchGroupsIfNeeded(options))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Index))
