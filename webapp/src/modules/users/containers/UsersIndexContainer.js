import { connect }               from 'react-redux'
import { withRouter }            from 'react-router-dom'
import { createSelector }        from 'reselect'

import createCollectionSelector  from '../../../core/selectors/createCollectionSelector'
import Index                     from '../components/GroupsIndex'
import { fetchGroupsIfNeeded }   from '../actions'
//import * as dto                  from '../dto'


const collectionSelector = createCollectionSelector('groups')

/*
const filtersSelector          = state => state.agencies.filters
const hasActiveFiltersSelector = createSelector(
    filtersSelector,
    filters => Object.keys(dto.filters(filters)).length > 0,
)
*/

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
