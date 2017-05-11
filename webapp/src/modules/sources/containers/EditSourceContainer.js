import { connect }    from 'react-redux'
import { withRouter } from 'react-router-dom'

import EditContracts  from '../components/EditContract'
import {
    fetchContractIfNeeded,
    updateContract,
} from '../actions'


const mapStateToProps = (state, { user }) => {
    const {
        hrContracts: { byId },
        updateHrContract: {
            isUpdating,
            error: updateError,
        },
    } = state

    const contract = byId[user.contractId || user.contract.id]

    return {
        contract:   contract ? contract.data : undefined,
        isFetching: contract ? contract.isFetching : false,
        error:      contract ? contract.error : null,
        isUpdating,
        updateError,
    }
}

const mapDispatchToProps = (dispatch, { user }) => ({
    fetch: () => {
        dispatch(fetchContractIfNeeded(user.contractId || user.contract.id))
    },
    update: data => {
        dispatch(updateContract(user.contractId || user.contract.id, data))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditContracts))
