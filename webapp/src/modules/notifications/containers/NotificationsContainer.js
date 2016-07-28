'use strict'

import { connect }            from 'react-redux'
import Notifications          from '../components/Notifications'
import { deleteNotification } from '../actions/notificationsActions'


const mapStateToProps = ({ notifications: { items }, locale }) => {
    return {
        notifications: items,
        locale:        locale.locale,
    }
}

const mapDispatchToProps = dispatch => ({
    deleteNotification: id => {
        dispatch(deleteNotification(id))
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notifications)
