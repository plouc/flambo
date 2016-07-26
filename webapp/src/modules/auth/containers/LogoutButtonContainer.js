'use strict'

import { connect }  from 'react-redux'
import LogoutButton from '../components/LogoutButton'
import { logout }   from '../actions/authActions'


const mapStateToProps = ({ locale }, props) => {
    return { locale: locale.locale }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLogout: id => {
        dispatch(logout())
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutButton)

