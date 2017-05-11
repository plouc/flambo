import { connect }        from 'react-redux'
import { withRouter }     from 'react-router-dom'
import { isDirty }        from 'redux-form'

import Settings           from '../components/Settings'
import { updateSettings } from '../actions'


const mapStateToProps = state => {
    const {
        intl: { locale },
    } = state

    return {
        settings: {
            locale,
        },
        isDirty: isDirty('settings')(state),
    }
}

const mapDispatchToProps = dispatch => ({
    updateSettings: settings => {
        dispatch(updateSettings(settings))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings))
