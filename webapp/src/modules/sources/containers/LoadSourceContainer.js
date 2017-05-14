import { connect }              from 'react-redux'
import { withRouter }           from 'react-router-dom'

import Load                     from '../components/LoadSource'
import { loadSource }           from '../actions'


const mapStateToProps = (state, { source }) => {

    console.log(source)

    return {}
}

const mapDispatchToProps = (dispatch, { source }) => ({
    load: () => {
        dispatch(loadSource(source.id))
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Load))
