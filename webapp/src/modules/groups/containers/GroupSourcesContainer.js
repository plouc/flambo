import { connect }            from 'react-redux'
import { compose, lifecycle } from 'recompose'

import GroupSources           from '../components/GroupSources'
import { fetchGroupSources }  from '../actions'


const mapStateToProps = ({ groupsSources: { byId } }, { group }) => {
    const groupSources = byId[group.id]

    let sources = []
    if (groupSources) {
        sources = groupSources.currentIds.map(id => {
            return groupSources.byId[id].data
        })
    }

    return {
        isFetching:     groupSources ? groupSources.isFetching : true,
        hasBeenFetched: groupSources ? !!groupSources.fetchedAt : false,
        sources,
    }
}

const mapDispatchToProps = (dispatch, { group }) => ({
    fetch: () => {
        dispatch(fetchGroupSources(group.id))
    },
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle({
        componentDidMount() {
            this.props.fetch()
        },
    })
)(GroupSources)
