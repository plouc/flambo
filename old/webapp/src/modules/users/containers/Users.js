import { connect } from 'react-redux'
import Users       from '../components/Users'
import {
    fetchUsersIfNeeded,
} from '../actions/usersActions'


const mapStateToProps = ({ users, locale }) => ({
    users:      users.users,
    status:     users.status,
    isFetching: users.isFetching,
    locale:     locale.locale,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchUsersIfNeeded: () => {
        dispatch(fetchUsersIfNeeded())
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users)

