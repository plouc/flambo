import React, { Component, PropTypes } from 'react';
import { Link }                        from 'react-router';
import sourceTitle                     from '../../lib/sourceTitle';


class TopicSources extends Component {
    render() {
        const { sources } = this.props;

        return (
            <p>
                sources:&nbsp;
                {sources.length === 0 && (
                    <span>no source defined, <Link to="/sources">add this topic to an existing source</Link> or <Link to="/sources/new">add one</Link> for this topic.</span>
                )}
                {sources.length > 0 && (
                    sources.map(source => (
                        <Link
                            style={{ display: 'inline-block', marginRight: '9px' }}
                            key={source.id}
                            to={`/sources/${source.id}`}
                        >
                            {sourceTitle(source)}
                        </Link>
                    ))
                )}
            </p>
        );
    }
}


export default TopicSources;
