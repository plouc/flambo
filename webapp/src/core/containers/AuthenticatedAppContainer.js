import { compose, lifecycle } from 'recompose'
import { connect }            from 'react-redux'

import { fetchMeIfNeeded }    from '../../modules/users/actions'
import AuthenticatedApp       from '../components/AuthenticatedApp'


const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    fetchMe: () => {
        dispatch(fetchMeIfNeeded())
    }
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    lifecycle({
        componentDidMount() {
            this.props.fetchMe()
        }
    })
)(AuthenticatedApp)