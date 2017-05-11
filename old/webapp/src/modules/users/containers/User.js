import { connect } from 'react-redux'
import User        from '../components/User'
import {
    fetchUserIfNeeded,
} from '../actions/userActions'


const mapStateToProps = ({ userById, locale }, props) => {
    const userId = props.params.id
    const user   = userById[userId]

    return {
        userId,
        user:       user ? user.user : null,
        isFetching: user ? user.isFetching : true,
        status:     user ? user.status : 0,
        locale:     locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchUserIfNeeded: id => {
        dispatch(fetchUserIfNeeded(id))
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)
