import React, { Component, PropTypes } from 'react';
import { Link }                        from 'react-router';


class SourceTopics extends Component {
    render() {
        const { source, topics } = this.props;

        return (
            <span>
                {topics.length === 0 && (
                    <span>no topic defined, <Link to={`/sources/${source.id}/edit`}>add one</Link>.</span>
                )}
                {topics.length > 0 && topics.map(topic => (
                    <Link
                        style={{ display: 'inline-block', marginRight: '9px' }}
                        key={topic.id}
                        to={`/topics/${topic.id}`}
                    >
                        {topic.name}
                    </Link>
                ))}
            </span>
        );
    }
}


export default SourceTopics;
