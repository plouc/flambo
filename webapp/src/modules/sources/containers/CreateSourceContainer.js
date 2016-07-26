'use strict'

import { connect }  from 'react-redux'
import CreateSource from '../components/CreateSource'


const mapStateToProps = ({ topics: { creation: { topic, loading } }, locale }) => {
    return {
        loading,
        topic,
        locale: locale.locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSource)
