import { connect }            from 'react-redux'
import { withRouter }         from 'react-router-dom'
import { compose, lifecycle } from 'recompose'

import GroupFeed              from '../components/GroupFeed'
import { fetchGroupFeed }     from '../actions'


const mapStateToProps = ({ groupsFeed: { byId } }, { group }) => {
    const groupFeed = byId[group.id]

    let items = []
    if (groupFeed) {
        items = groupFeed.currentIds.map(id => {
            return groupFeed.byId[id].data
        })
    }

    return {
        items,
    }
}

const mapDispatchToProps = (dispatch, { group }) => ({
    fetch: () => {
        dispatch(fetchGroupFeed(group.id))
    },
})

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle({
        componentDidMount() {
            this.props.fetch()
        },
    })
)(GroupFeed)
