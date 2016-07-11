import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import TopicForm                       from './TopicForm'


const defaultTopic = {
    name: '',
}


class CreateTopic extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            topic:  defaultTopic,
            errors: [],
        }
    }

    handleChange(topic) {
        this.setState({ topic })
    }

    handleSubmit() {
        const { createTopic } = this.props
        const { topic }       = this.state
        createTopic(topic)
    }

    render() {
        const { topic, errors } = this.state

        return (
            <div>
                <div className="content-header">
                    <h1>
                        <FormattedMessage id="topic.create" />
                    </h1>
                </div>
                <div className="content-wrapper">
                    <TopicForm
                        topic={topic}
                        errors={errors}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        withFileUpload={false}
                    />
                </div>
            </div>
        )
    }
}

CreateTopic.propTypes = {
    createTopic: PropTypes.func.isRequired,
}


export default CreateTopic
