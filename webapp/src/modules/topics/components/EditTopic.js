import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import TopicForm                       from './TopicForm'


class EditTopic extends Component {
    constructor(props) {
        super(props)

        this.handleChange     = this.handleChange.bind(this)
        this.handleSubmit     = this.handleSubmit.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)

        this.state = { topic: props.topic }
    }

    componentWillMount() {
        const { fetchTopicIfNeeded } = this.props
        const { id }                 = this.props.params
        fetchTopicIfNeeded(id)
    }

    componentWillReceiveProps({ topic }) {
        this.setState({ topic })
    }

    handleChange(topic) {
        this.setState({ topic })
    }

    handleSubmit() {
        const { updateTopic } = this.props
        const { topic }       = this.state

        updateTopic(topic.id, topic)
    }

    handleFileUpload(file) {
        const { topic, uploadTopicPicture } = this.props

        uploadTopicPicture(topic.id, file)
    }

    render() {
        const { isFetching } = this.props
        const { topic }      = this.state

        if (isFetching) {
            return (
                <div>
                    <div className="content-header">
                        <h1>loading…</h1>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="content-header">
                    <h1>
                        <FormattedMessage id="topic.edit" />
                    </h1>
                </div>
                <div className="content-wrapper">
                    <TopicForm
                        topic={topic}
                        errors={[]}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        withFileUpload={true}
                        onFileUpload={this.handleFileUpload}
                        cancelPath={`/topics/${topic.id}`}
                    />
                </div>
            </div>
        )
    }
}

EditTopic.propTypes = {
    fetchTopicIfNeeded: PropTypes.func.isRequired,
    updateTopic:        PropTypes.func.isRequired,
    uploadTopicPicture: PropTypes.func.isRequired,
    topic:              PropTypes.object,
    isFetching:         PropTypes.bool.isRequired,
}

EditTopic.defaultProps = {
    isFetching: true,
}


export default EditTopic
