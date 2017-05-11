import { connect } from 'react-redux'
import Topics      from '../components/Topics'
import {
    fetchTopicsIfNeeded,
    filterTopics,
} from '../actions/topicsActions'


const mapStateToProps = ({ topics: { list: { items, loading, error, filters } }, locale }) => {
    let filteredTopics = items
    if (filters.subscribed === true) {
        filteredTopics = items.filter(topic => topic.subscribed)
    }

    return {
        topics: filteredTopics,
        loading,
        error,
        filters,
        locale: locale.locale,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTopicsIfNeeded: () => {
        dispatch(fetchTopicsIfNeeded())
    },
    filterTopics: filters => {
        dispatch(filterTopics(filters))
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topics)

