import { connect }               from 'react-redux'
import { withRouter }            from 'react-router-dom'

import createCollectionSelector  from '../../../core/selectors/createCollectionSelector'
import Index                     from '../components/UsersIndex'
import { fetchUsersIfNeeded }    from '../actions'


const collectionSelector = createCollectionSelector('users')

const mapStateToProps = state => {
    const {
        users: {
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
        users:            collectionSelector(state),
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
        dispatch(fetchUsersIfNeeded(options))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Index))
