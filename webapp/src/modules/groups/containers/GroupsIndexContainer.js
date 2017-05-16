import { connect }               from 'react-redux'
import { withRouter }            from 'react-router-dom'
import { compose, lifecycle }    from 'recompose'

import createCollectionSelector  from '../../../core/selectors/createCollectionSelector'
import Index                     from '../components/GroupsIndex'
import {
    fetchGroupsIfNeeded,
    fetchNextGroups,
} from '../actions'


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

const mapDispatchToProps = (dispatch, props) => ({
    fetch: options => {
        dispatch(fetchGroupsIfNeeded(options))
    },
    fetchNext: () => {
        dispatch(fetchNextGroups())
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
)(Index)
