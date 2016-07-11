import { connect }   from 'react-redux'
import { setLocale } from '../actions/localeActions'
import LocaleSwitch  from '../components/LocaleSwitch'

const mapStateToProps = ({ locale }) => ({ locale: locale.locale })

const mapDispatchToProps = dispatch => ({
    setLocale: locale => {
        dispatch(setLocale(locale))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocaleSwitch)