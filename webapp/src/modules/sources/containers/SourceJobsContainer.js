import { connect }            from 'react-redux'
import { withRouter }         from 'react-router-dom'
import { compose, lifecycle } from 'recompose'

import SourceJobs             from '../components/SourceJobs'
import { fetchSourceJobs }    from '../actions'


const mapStateToProps = ({ sourcesJobs: { byId } }, { source }) => {
    const sourceJobs = byId[source.id]

    let jobs = []
    if (sourceJobs) {
        jobs = sourceJobs.currentIds.map(id => {
            return sourceJobs.byId[id].data
        })
    }

    return {
        jobs,
    }
}

const mapDispatchToProps = (dispatch, { source }) => ({
    fetch: () => {
        dispatch(fetchSourceJobs(source.id))
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
)(SourceJobs)
