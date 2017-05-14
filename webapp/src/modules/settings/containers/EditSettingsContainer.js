import { connect }        from 'react-redux'
import { withRouter }     from 'react-router-dom'

import Edit               from '../components/EditSettings'
import { updateSettings } from '../actions'


const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    update: data => {
        dispatch(updateSettings(data))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit))
