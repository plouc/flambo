import React, { Component } from 'react';
import { Link }             from 'react-router';
import Api                  from '../Api';


class Topics extends Component {
    constructor(props) {
        super(props);

        this.state = { topics: [] };
    }

    componentWillMount() {
        Api.getTopics()
            .then(topics => {
                this.setState({ topics });
            })
        ;
    }

    render() {
        const { topics } = this.state;

        return (
            <div>
                <h1>Topics</h1>
                <ul>
                    {topics.map(topic => (
                        <li key={topic.id}>
                            <Link to={`/topics/${topic.id}`}>{topic.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}


export default Topics;
