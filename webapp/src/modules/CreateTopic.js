import React, { Component } from 'react';
import { browserHistory }   from 'react-router';
import Api                  from '../Api';
import TopicForm            from '../components/topic/TopicForm';


const defaultTopic = {
    name: '',
};


class CreateTopic extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            topic:  defaultTopic,
            errors: [],
        };
    }

    handleChange(topic) {
        this.setState({ topic });
    }

    handleSubmit() {
        const { topic } = this.state;

        Api.createTopic(topic)
            .then(result => {
                if (result.hasError) {
                    this.setState({ errors: result.errors });
                } else {
                    this.setState({
                        errors: [],
                        topic:  defaultTopic
                    });
                    browserHistory.push('/topics');
                }
            })
        ;
    }

    render() {
        const { topic, errors } = this.state;

        return (
            <div>
                <h1>New topic</h1>
                <TopicForm
                    topic={topic}
                    errors={errors}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}


export default CreateTopic;
