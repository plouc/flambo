import { connect } from 'react-redux'
import Topics      from '../components/Topics'
import {
    fetchTopicsIfNeeded,
} from '../actions/topicsActions'


const mapStateToProps = ({ topics: { list: { items, loading, error } }, locale }) => {
    return {
        topics: items,
        loading,
        error,
        locale: locale.locale,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTopicsIfNeeded: () => {
        dispatch(fetchTopicsIfNeeded())
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topics)

