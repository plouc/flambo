import { connect }                           from 'react-redux'
import { withRouter }                        from 'react-router-dom'
import { isDirty }                           from 'redux-form'

import Agency                                from '../components/Agency'
import { fetchAgencyIfNeeded, updateAgency } from '../actions'
import { FORM_NAME }                         from '../constants'


const mapStateToProps = (
    state,
    { match: { params: { id } } },
) => {
    const { agencies: { byId } } = state
    const agency                 = byId[Number(id)]

    return {
        id:          Number(id),
        isFetching:  agency ? agency.isFetching : false,
        agency:      (agency && agency.data) ? agency.data : null,
        error:       agency ? agency.error : null,
        isUpdating:  state.updateAgency.isUpdating,
        isDirty:     isDirty(FORM_NAME)(state),
        updateError: state.updateAgency.error,
    }
}

const mapDispatchToProps = (dispatch, { match: { params: { id } } }) => ({
    fetch: () => {
        dispatch(fetchAgencyIfNeeded(Number(id)))
    },
    update: data => {
        dispatch(updateAgency(Number(id), data))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Agency))
