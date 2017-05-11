'use strict'

import { connect }           from 'react-redux'
import UserBadge             from '../components/UserBadge'
import { logout }            from '../../auth/actions/authActions'
import { fetchUserIfNeeded } from '../actions/userActions'


const mapStateToProps = ({ auth, userById, locale }) => {
    const me = userById.me

    return {
        locale:          locale.locale,
        isAuthenticated: auth.isAuthenticated,
        isFetching:      !me || me.isFetching,
        me:              me ? me.user : null,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLogout: () => {
        dispatch(logout())
    },
    fetchProfileIfNeeded: () => {
        dispatch(fetchUserIfNeeded('me'))
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBadge)

