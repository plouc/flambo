'use strict'

import { connect } from 'react-redux'
import Profile     from '../components/Profile'
import {
    fetchUserIfNeeded,
} from '../actions/userActions'


const mapStateToProps = ({ userById, locale }) => {
    const profile = userById.me

    return {
        isFetching: !profile || profile.isFetching,
        profile:    profile ? profile.user : null,
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
)(Profile)
