'use strict'

import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import TopicForm                       from '../containers/TopicFormContainer'
import Loader                          from '../../core/components/Loader'
import { updateTopic }                 from '../actions/topicsActions'


class EditTopic extends Component {
    constructor(props) {
        super(props)

        this.handleFileUpload = this.handleFileUpload.bind(this)
    }

    componentWillMount() {
        const { fetchTopicIfNeeded } = this.props
        const { id }                 = this.props.params
        fetchTopicIfNeeded(id)
    }

    handleFileUpload(file) {
        const { topic, uploadTopicPicture } = this.props

        uploadTopicPicture(topic.id, file)
    }

    render() {
        const { topicId, topic, sources, loading, deleteTopic } = this.props

        let form = null
        if (!loading) {
            form = (
                <TopicForm
                    onSubmit={updateTopic}
                    sources={sources}
                    withFileUpload={true}
                    onFileUpload={this.handleFileUpload}
                    cancelPath={`/topics/${topicId}`}
                    initialValues={Object.assign({}, topic, { sources: topic.sources.map(({ id }) => id) })}
                />
            )
        }

        return (
            <div className="content">
                <div className="fixed-header content-header">
                    <h1>
                        <FormattedMessage id="topic.settings" />
                    </h1>
                    <Loader loading={loading}/>
                </div>
                <div className="content-with-fixed-header">
                    {form}
                    <div className="section">
                        <h3>
                            <FormattedMessage id="topic.delete.title" />
                        </h3>
                        <p>
                            <FormattedMessage id="topic.delete.warning" />
                        </p>
                        <span
                            className="button button--error"
                            onClick={() => { deleteTopic(topicId) }}
                        >
                            <FormattedMessage id="topic.delete.button" />
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

EditTopic.propTypes = {
    fetchTopicIfNeeded: PropTypes.func.isRequired,
    uploadTopicPicture: PropTypes.func.isRequired,
    deleteTopic:        PropTypes.func.isRequired,
    topic:              PropTypes.object,
    loading:            PropTypes.bool.isRequired,
}


export default EditTopic
