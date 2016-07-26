'use strict'

import _                        from 'lodash'
import { reduxForm }            from 'redux-form'
import TopicForm                from '../components/TopicForm'
import { fetchSourcesIfNeeded } from '../../sources/actions/sourcesActions'


const mapStateToProps = ({ sources, auth: { token }, locale }, { onSubmit }) => {
    return {
        sources:  sources.sources,
        onSubmit: _.partial(onSubmit, token), // bind jwt token from current state
        locale:   locale.locale,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchSourcesIfNeeded: () => {
        dispatch(fetchSourcesIfNeeded())
    },
})

export default reduxForm(
    {
        form:   'topic',
        fields: ['id', 'name', 'description', 'sources'],
    },
    mapStateToProps,
    mapDispatchToProps
)(TopicForm)

