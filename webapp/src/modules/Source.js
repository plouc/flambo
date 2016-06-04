import React, { Component } from 'react';
import SourceTopics         from '../components/source/SourceTopics';
import sourceTitle          from '../lib/sourceTitle';
import Api                  from '../Api';


class Source extends Component {
    constructor(props) {
        super(props);

        this.state = {
            source:    null,
            newsItems: [],
            loading:   true
        };
    }

    componentWillMount() {
        const { id } = this.props.params;

        Api.getSourceWithNewsItems(id)
            .then(({ source, newsItems }) => {
                this.setState({
                    source,
                    newsItems: newsItems.docs,
                    loading:   false
                });
            })
        ;
    }

    render() {
        const { source, newsItems, loading } = this.state;

        return (
            <div>
                <h1>{source && (<span>{sourceTitle(source)}</span>)}</h1>
                {source && (
                    <p>
                        topics:&nbsp;
                        <SourceTopics source={source} topics={source.themes}/>
                    </p>
                )}
                {loading && (
                    <p>loading…</p>
                )}
                {!loading && (
                    newsItems.map(newsItem => (
                        <div key={newsItem.id} style={{ borderTop: '1px dotted #000' }}>
                            <p>{newsItem.content}</p>
                        </div>
                    ))
                )}
            </div>
        );
    }
}


export default Source;
