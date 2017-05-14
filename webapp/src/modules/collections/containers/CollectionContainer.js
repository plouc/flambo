import { connect }                 from 'react-redux'
import { withRouter, matchPath }   from 'react-router-dom'
import { compose, lifecycle }      from 'recompose'
import { reduxForm }               from 'redux-form'

import { createItemSelector }      from '../../../core/selectors'
import Collection                  from '../components/Collection'
import { fetchCollectionIfNeeded } from '../actions'
import { FORM_NAME }               from '../constants'


const itemSelector = createItemSelector('collections', 'collection')

const mapStateToProps = (state, { location, match: { url, params } }) => {
    const isEditing = !!matchPath(location.pathname, {
        path: `${url}/edit`,
    })

    return {
        ...itemSelector({ state, params }),
        isEditing,
    }
}

const mapDispatchToProps = (dispatch, { match: { params: { id } } }) => ({
    fetch: () => {
        dispatch(fetchCollectionIfNeeded(id))
    },
})

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm({
        form: FORM_NAME,
    }),
    lifecycle({
        componentDidMount() {
            this.props.fetch()
        },
        componentDidUpdate({ id }) {
            const { id: prevId, fetch } = this.props
            if (prevId !== id) fetch()
        },
    })
)(Collection)