import { connect }            from 'react-redux'
import { withRouter }         from 'react-router-dom'
import { compose, lifecycle } from 'recompose'

import SourceFeed             from '../components/SourceFeed'
import { fetchSourceFeed }    from '../actions'


const mapStateToProps = ({ sourcesFeed: { byId } }, { source }) => {
    const sourceFeed = byId[source.id]

    let items = []
    if (sourceFeed) {
        items = sourceFeed.currentIds.map(id => {
            return sourceFeed.byId[id].data
        })
    }

    return {
        isFetching:     sourceFeed ? sourceFeed.isFetching : true,
        hasBeenFetched: sourceFeed ? !!sourceFeed.fetchedAt : false,
        items,
    }
}

const mapDispatchToProps = (dispatch, { source }) => ({
    fetch: () => {
        dispatch(fetchSourceFeed(source.id))
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
)(SourceFeed)
