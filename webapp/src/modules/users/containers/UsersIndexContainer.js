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
            hasNextPage,
            error,
        },
    } = state

    return {
        hasBeenFetched: !!fetchedAt,
        users:          collectionSelector(state),
        isFetching:     isFetching,
        hasNextPage,
        error,
    }
}

const mapDispatchToProps = dispatch => ({
    fetch: options => {
        return dispatch(fetchUsersIfNeeded(options))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Index))
