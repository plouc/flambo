import { connect }    from 'react-redux'
import { withRouter } from 'react-router-dom'

import App            from '../components/App'


const mapStateToProps = ({
    intl: locale,
    auth: { isAuthenticated }
}, ownProps) => ({
    locale,
    isAuthenticated,
})

export default withRouter(connect(
    mapStateToProps
)(App))
