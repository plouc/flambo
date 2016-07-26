'use strict'

import { connect }   from 'react-redux'
import CreateTopic   from '../components/CreateTopic'


const mapStateToProps = ({ topics: { creation: { topic, loading } }, locale }) => {
    return {
        loading,
        topic,
        locale: locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateTopic)
