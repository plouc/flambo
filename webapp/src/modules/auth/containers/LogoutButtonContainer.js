import { connect }  from 'react-redux'

import { logout }   from '../actions'
import LogoutButton from '../components/LogoutButton'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch(logout())
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutButton)
