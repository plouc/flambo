import { connect }                 from 'react-redux'
import { withRouter }              from 'react-router-dom'

import Group                       from '../components/Group'
import { fetchCollectionIfNeeded } from '../actions'


const mapStateToProps = (
    state,
    { match: { params: { id } } },
) => {
    const { groups: { byId } } = state
    const group                = byId[id]

    return {
        id,
        isFetching: group ? group.isFetching : false,
        group:      (group && group.data) ? group.data : null,
        error:      group ? group.error : null,
    }
}

const mapDispatchToProps = (dispatch, { match: { params: { id } } }) => ({
    fetch: () => {
        dispatch(fetchCollectionIfNeeded(id))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Group))
